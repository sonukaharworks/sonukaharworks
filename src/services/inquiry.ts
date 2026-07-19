import { db, isFirebaseConfigured } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';

export interface ProjectInquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  message: string;
  createdAt?: string; // ISO string or Firebase Timestamp
}

const LOCAL_STORAGE_KEY_INQUIRIES = 'sk_project_inquiries';

export const inquiryService = {
  // Store a new project inquiry in Firestore (or LocalStorage fallback)
  async createInquiry(inquiry: Omit<ProjectInquiry, 'id' | 'createdAt'>) {
    const entry = {
      ...inquiry,
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured && db) {
      try {
        const colRef = collection(db, 'project_inquiries');
        await addDoc(colRef, {
          ...entry,
          createdAtServer: serverTimestamp()
        });
        console.log('Inquiry logged in Firestore');
        return true;
      } catch (error) {
        console.error('Firestore inquiry storage error, fallback to LocalStorage:', error);
        this.saveToLocalStorage(entry);
        return true;
      }
    } else {
      this.saveToLocalStorage(entry);
      return true;
    }
  },

  // Local storage helper
  saveToLocalStorage(entry: any) {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_INQUIRIES);
      const inquiries = raw ? JSON.parse(raw) : [];
      inquiries.unshift(entry);
      localStorage.setItem(LOCAL_STORAGE_KEY_INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Could not save inquiry locally:', e);
    }
  },

  // Subscribe to real-time project inquiries
  subscribeToInquiries(onUpdate: (inquiries: ProjectInquiry[]) => void): () => void {
    if (isFirebaseConfigured && db) {
      try {
        const colRef = collection(db, 'project_inquiries');
        const q = query(colRef, orderBy('createdAtServer', 'desc'), limit(100));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const list: ProjectInquiry[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            let createdAt = data.createdAt;
            if (data.createdAtServer && typeof data.createdAtServer.toDate === 'function') {
              createdAt = data.createdAtServer.toDate().toISOString();
            }
            list.push({
              id: doc.id,
              name: data.name || 'Anonymous',
              email: data.email || '',
              phone: data.phone || '',
              projectType: data.projectType || 'Custom Project',
              budget: data.budget || 'Contact Me',
              message: data.message || '',
              createdAt: createdAt || new Date().toISOString()
            });
          });

          if (list.length > 0) {
            onUpdate(list);
          } else {
            onUpdate(this.getLocalInquiries());
          }
        }, (error) => {
          console.error('Firestore inquiry subscribe error:', error);
          onUpdate(this.getLocalInquiries());
        });

        return unsubscribe;
      } catch (e) {
        console.error('Inquiry subscription setup error:', e);
      }
    }

    // fallback simulation
    const interval = setInterval(() => {
      onUpdate(this.getLocalInquiries());
    }, 2000);
    onUpdate(this.getLocalInquiries());

    return () => clearInterval(interval);
  },

  // Load from local storage
  getLocalInquiries(): ProjectInquiry[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY_INQUIRIES);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {}

    // Initial gorgeous mock for testing
    return [
      {
        id: 'inq_1',
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+91 9876543210',
        projectType: 'Premium App',
        budget: '₹6,999',
        message: 'Looking to build a premium mobile app with dynamic dashboard and clean theme.',
        createdAt: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'inq_2',
        name: 'Alice Smith',
        email: 'alice@example.com',
        projectType: 'Starter Website',
        budget: '₹1,499',
        message: 'Need a fast loading, clean glassmorphism responsive portfolio landing page.',
        createdAt: new Date(Date.now() - 7200000).toISOString()
      }
    ];
  }
};
