import { db, isFirebaseConfigured } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp, Timestamp } from 'firebase/firestore';

export interface VisitorLog {
  id?: string;
  visitTime: string; // ISO String
  browser: string;
  os: string;
  deviceType: string;
  language: string;
  timeZone: string;
  location: {
    lat: number | null;
    lng: number | null;
    city: string;
    state: string;
    country: string;
  } | null;
  pageVisited: string;
}

const LOCAL_STORAGE_KEY_PERMISSION = 'sk_visitor_cloud_sync_permission';
const LOCAL_STORAGE_KEY_VISITOR_ID = 'sk_visitor_unique_id';
const LOCAL_STORAGE_KEY_LOGS = 'sk_visitor_local_logs';

// Helper to get browser name
function getBrowserName(): string {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome') && !userAgent.includes('Chromium') && !userAgent.includes('Edg')) return 'Chrome';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Edg')) return 'Edge';
  return 'Web Browser';
}

// Helper to get OS name
function getOSName(): string {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Windows NT 10.0')) return 'Windows 10/11';
  if (userAgent.includes('Macintosh')) return 'macOS';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  if (userAgent.includes('Linux')) return 'Linux';
  return 'Operating System';
}

// Helper to get device type
function getDeviceType(): string {
  const userAgent = navigator.userAgent;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return 'Mobile Node';
  }
  return 'Desktop Terminal';
}

// Generate stable visitor ID
function getOrCreateVisitorId(): string {
  try {
    let id = localStorage.getItem(LOCAL_STORAGE_KEY_VISITOR_ID);
    if (!id) {
      id = 'visitor_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
      localStorage.setItem(LOCAL_STORAGE_KEY_VISITOR_ID, id);
    }
    return id;
  } catch {
    return 'visitor_temp_' + Math.random().toString(36).substring(2, 8);
  }
}

// Core functions for visitor log service
export const visitorLogService = {
  // Check if consent has been chosen ('granted' | 'denied' | 'pending')
  getConsentState(): 'granted' | 'denied' | 'pending' {
    try {
      const state = localStorage.getItem(LOCAL_STORAGE_KEY_PERMISSION);
      if (state === 'granted') return 'granted';
      if (state === 'denied') return 'denied';
      return 'pending';
    } catch {
      return 'pending';
    }
  },

  // Save consent state
  setConsentState(state: 'granted' | 'denied') {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PERMISSION, state);
    } catch (e) {
      console.warn('LocalStorage error saving consent:', e);
    }
  },

  // Log visitor to Firebase (or localStorage fallback)
  async logVisit(pageName: string, locationData: { lat: number | null; lng: number | null; city: string; state: string; country: string } | null) {
    const consent = this.getConsentState();
    if (consent !== 'granted') return; // strictly require explicit permission

    const logEntry: VisitorLog = {
      visitTime: new Date().toISOString(),
      browser: getBrowserName(),
      os: getOSName(),
      deviceType: getDeviceType(),
      language: navigator.language || 'en-US',
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      location: locationData,
      pageVisited: pageName
    };

    // 1. Firebase Logging
    if (isFirebaseConfigured && db) {
      try {
        const colRef = collection(db, 'visitor_logs');
        await addDoc(colRef, {
          ...logEntry,
          createdAt: serverTimestamp() // Add server timestamp for secure ordering
        });
        console.log('Successfully logged visit to Firestore:', pageName);
      } catch (error) {
        console.error('Failed to log to Firestore, fallback to local storage:', error);
        this.logToLocalStorage(logEntry);
      }
    } else {
      // 2. Local Storage Fallback Logging
      this.logToLocalStorage(logEntry);
    }
  },

  // Internal helper to log entry in local storage
  logToLocalStorage(entry: VisitorLog) {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_LOGS);
      const logs: VisitorLog[] = raw ? JSON.parse(raw) : [];
      
      // Limit to 200 logs to prevent overflow
      logs.unshift(entry);
      if (logs.length > 200) {
        logs.pop();
      }
      localStorage.setItem(LOCAL_STORAGE_KEY_LOGS, JSON.stringify(logs));
    } catch (e) {
      console.warn('Could not save log entry to localStorage:', e);
    }
  },

  // Fetch / Subscribe to real-time updates for logs
  subscribeToLogs(onUpdate: (logs: VisitorLog[]) => void): () => void {
    if (isFirebaseConfigured && db) {
      try {
        const colRef = collection(db, 'visitor_logs');
        // Retrieve latest 100 logs
        const q = query(colRef, orderBy('createdAt', 'desc'), limit(100));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const logs: VisitorLog[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            // Handle timestamp format
            let visitTime = data.visitTime;
            if (data.createdAt && typeof data.createdAt.toDate === 'function') {
              visitTime = data.createdAt.toDate().toISOString();
            }
            logs.push({
              id: doc.id,
              visitTime,
              browser: data.browser || 'Unknown',
              os: data.os || 'Unknown',
              deviceType: data.deviceType || 'Unknown',
              language: data.language || 'en-US',
              timeZone: data.timeZone || 'UTC',
              location: data.location || null,
              pageVisited: data.pageVisited || 'Unknown'
            });
          });
          
          // If Firestore is empty (or brand new), merge or return
          if (logs.length > 0) {
            onUpdate(logs);
          } else {
            // Load local logs as default mock if empty
            onUpdate(this.getLocalLogs());
          }
        }, (error) => {
          console.error('Firestore subscription error, falling back to local logs:', error);
          onUpdate(this.getLocalLogs());
        });
        
        return unsubscribe;
      } catch (e) {
        console.error('Subscription setup failed, falling back:', e);
      }
    }

    // fallback: poll local storage every 2 seconds to simulate real-time updates
    const interval = setInterval(() => {
      onUpdate(this.getLocalLogs());
    }, 2000);
    // Initial trigger
    onUpdate(this.getLocalLogs());
    
    return () => clearInterval(interval);
  },

  // Helper to load local logs
  getLocalLogs(): VisitorLog[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_LOGS);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {}
    
    // Default mock log if empty, for cinematic demonstration
    return [
      {
        id: 'mock_1',
        visitTime: new Date(Date.now() - 5000).toISOString(),
        browser: 'Chrome',
        os: 'macOS',
        deviceType: 'Desktop Terminal',
        language: 'en-US',
        timeZone: 'Asia/Kolkata',
        location: { lat: 28.6139, lng: 77.2090, city: 'New Delhi', state: 'Delhi', country: 'India' },
        pageVisited: 'home'
      },
      {
        id: 'mock_2',
        visitTime: new Date(Date.now() - 150000).toISOString(),
        browser: 'Safari',
        os: 'iOS',
        deviceType: 'Mobile Node',
        language: 'en-GB',
        timeZone: 'Europe/London',
        location: { lat: 51.5074, lng: -0.1278, city: 'London', state: 'Greater London', country: 'United Kingdom' },
        pageVisited: 'portfolio'
      }
    ];
  }
};
