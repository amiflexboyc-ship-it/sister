import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const LOCAL_DATA_FILE = path.join(__dirname, 'data', 'salon.json');
const DATA_FILE = process.env.VERCEL
  ? path.join('/tmp', 'salon.json')
  : LOCAL_DATA_FILE;

let inMemoryCache = null;

// Ensure data folder exists
const ensureDataDir = () => {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (err) {
    console.warn('Could not create directory for DATA_FILE:', err.message);
  }
};

// Initial sample seed data
const getInitialData = () => {
  const today = new Date().toISOString().split('T')[0];
  return {
    bookings: [
      {
        id: 'b-101',
        refCode: 'AG-782194',
        serviceId: 'braids',
        serviceName: 'Imperial Knotless & Boho Braids',
        price: '£80',
        numericPrice: 80,
        date: today,
        time: '11:00 AM',
        stylist: 'Miriam K. — Braiding Specialist',
        name: 'Oluwaseun Adeleke',
        phone: '+44 7848 998911',
        email: 'seun@luxuryhair.uk',
        notes: 'Mid-back length, bohemian curly ends.',
        status: 'confirmed',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 'b-102',
        refCode: 'AG-914205',
        serviceId: 'cornrows',
        serviceName: 'Signature Feed-In Cornrows',
        price: '£60',
        numericPrice: 60,
        date: today,
        time: '02:30 PM',
        stylist: 'Zainab Cole - Cornrow & Crochet Artisan',
        name: 'Chinedu Eze',
        phone: '+44 7712 345678',
        email: 'chinedu.eze@outlook.co.uk',
        notes: '6-8 stitch feed-in cornrows with sleek finish.',
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 'b-103',
        refCode: 'AG-553108',
        serviceId: 'bridal',
        serviceName: 'Imperial Bridal Crown & Glam Suite',
        price: '£100',
        numericPrice: 100,
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        time: '09:00 AM',
        stylist: 'Nafisat Adebayo - Lead Creative Director',
        name: 'Fatima Adeleke',
        phone: '+44 7901 234567',
        email: 'fatima.adeleke@events.uk',
        notes: 'Pre-wedding consultation & HD lace installation trial in Essex.',
        status: 'confirmed',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'b-104',
        refCode: 'AG-241088',
        serviceId: 'crochet',
        serviceName: 'Luxury Crochet Braids & Curls',
        price: '£50',
        numericPrice: 50,
        date: today,
        time: '04:00 PM',
        stylist: 'Zainab Cole - Cornrow & Crochet Artisan',
        name: 'Victoria Johnson',
        phone: '+44 7456 789012',
        email: 'vicky.j@gmail.com',
        notes: 'Bohemian wavy crochet install.',
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      },
    ],
    messages: [
      {
        id: 'm-201',
        name: 'Zainab Ahmed',
        phone: '+44 7848 998911',
        email: 'zainab@gmail.com',
        location: 'Westcliff-on-Sea Salon (SS0 8AW, Essex)',
        subject: 'Bridal Party Inquiry (Bride & Baby/Toddler)',
        message: 'Hello, we are planning a wedding and want full hair styling for the bride and gentle braids with beads for our toddler daughter. Do you have a private suite available in Westcliff?',
        status: 'unread',
        createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
      {
        id: 'm-202',
        name: 'Mrs. Temi Alabi',
        phone: '+44 7823 456789',
        email: 'temi@alabi.co.uk',
        location: 'Westcliff-on-Sea Salon (SS0 8AW, Essex)',
        subject: 'VIP Monthly Membership Inquiry',
        message: 'Interested in the Gold Member Club for monthly knotless braids and crochet styling in Southend.',
        status: 'read',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
    ],
    subscribers: [
      { id: 's-1', email: 'nafisatadebayo811@gmail.com', createdAt: new Date(Date.now() - 86400000 * 3).toISOString() },
      { id: 's-2', email: 'vip.client@southend.co.uk', createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
    ],
  };
};

// Read database
export const readDb = () => {
  if (inMemoryCache) {
    return inMemoryCache;
  }
  ensureDataDir();
  try {
    if (!fs.existsSync(DATA_FILE)) {
      let initial = null;
      if (fs.existsSync(LOCAL_DATA_FILE)) {
        try {
          initial = JSON.parse(fs.readFileSync(LOCAL_DATA_FILE, 'utf-8'));
        } catch {
          initial = getInitialData();
        }
      } else {
        initial = getInitialData();
      }
      try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      } catch {
        // In-memory fallback
      }
      inMemoryCache = initial;
      return initial;
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    inMemoryCache = parsed;
    return parsed;
  } catch (err) {
    console.error('Error reading DB, re-initializing:', err.message);
    const initial = getInitialData();
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    } catch {
      // In-memory fallback
    }
    inMemoryCache = initial;
    return initial;
  }
};

// Write database atomically with in-memory caching
export const writeDb = (data) => {
  inMemoryCache = data;
  ensureDataDir();
  try {
    const tempFile = `${DATA_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DATA_FILE);
  } catch (err) {
    console.warn('Filesystem write failed, retained in-memory cache:', err.message);
  }
};

// Bookings CRUD
export const getBookings = (filters = {}) => {
  const db = readDb();
  let list = db.bookings || [];
  if (filters.date) {
    list = list.filter(b => b.date === filters.date);
  }
  if (filters.status) {
    list = list.filter(b => b.status === filters.status);
  }
  // Sort most recent first
  return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const createBooking = (payload) => {
  const db = readDb();
  const refCode = payload.refCode || 'AG-' + Math.floor(100000 + Math.random() * 900000);
  const newBooking = {
    id: 'b-' + Date.now(),
    refCode,
    serviceId: payload.serviceId || 'braids',
    serviceName: payload.serviceName || 'Imperial Knotless & Boho Braids',
    price: payload.price || '£80',
    numericPrice: payload.numericPrice || 80,
    date: payload.date,
    time: payload.time,
    stylist: payload.stylist || 'Any Available Master Artisan',
    name: payload.name,
    phone: payload.phone,
    email: payload.email || '',
    notes: payload.notes || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  db.bookings = [newBooking, ...(db.bookings || [])];
  writeDb(db);
  return newBooking;
};

export const updateBookingStatus = (id, status) => {
  const db = readDb();
  const index = (db.bookings || []).findIndex(b => b.id === id);
  if (index === -1) return null;
  db.bookings[index].status = status;
  db.bookings[index].updatedAt = new Date().toISOString();
  writeDb(db);
  return db.bookings[index];
};

export const deleteBooking = (id) => {
  const db = readDb();
  const filtered = (db.bookings || []).filter(b => b.id !== id);
  db.bookings = filtered;
  writeDb(db);
  return true;
};

// Messages CRUD
export const getMessages = () => {
  const db = readDb();
  return (db.messages || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const createMessage = (payload) => {
  const db = readDb();
  const newMessage = {
    id: 'm-' + Date.now(),
    name: payload.name,
    phone: payload.phone,
    email: payload.email || '',
    location: payload.location || 'Westcliff-on-Sea Salon (SS0 8AW, Essex)',
    subject: payload.subject || 'VIP Inquiry',
    message: payload.message,
    status: 'unread',
    createdAt: new Date().toISOString(),
  };
  db.messages = [newMessage, ...(db.messages || [])];
  writeDb(db);
  return newMessage;
};

export const updateMessageStatus = (id, status) => {
  const db = readDb();
  const index = (db.messages || []).findIndex(m => m.id === id);
  if (index === -1) return null;
  db.messages[index].status = status;
  writeDb(db);
  return db.messages[index];
};

export const deleteMessage = (id) => {
  const db = readDb();
  db.messages = (db.messages || []).filter(m => m.id !== id);
  writeDb(db);
  return true;
};

// Newsletter
export const addSubscriber = (email) => {
  const db = readDb();
  if (!db.subscribers) db.subscribers = [];
  const exists = db.subscribers.some(s => s.email.toLowerCase() === email.toLowerCase());
  if (exists) return { message: 'Already subscribed' };
  const sub = {
    id: 's-' + Date.now(),
    email,
    createdAt: new Date().toISOString(),
  };
  db.subscribers.push(sub);
  writeDb(db);
  return sub;
};

export const getSubscribers = () => {
  const db = readDb();
  return db.subscribers || [];
};

// Stats calculation
export const getStats = () => {
  const db = readDb();
  const bookings = db.bookings || [];
  const messages = db.messages || [];
  const subscribers = db.subscribers || [];

  const totalRevenue = bookings
    .filter(b => b.status === 'confirmed' || b.status === 'completed')
    .reduce((sum, b) => sum + (Number(b.numericPrice) || 0), 0);

  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const unreadMessagesCount = messages.filter(m => m.status === 'unread').length;

  const todayStr = new Date().toISOString().split('T')[0];
  const todayBookingsCount = bookings.filter(b => b.date === todayStr).length;

  return {
    totalRevenue,
    totalRevenueFormatted: '£' + totalRevenue.toLocaleString(),
    totalBookings: bookings.length,
    pendingCount,
    confirmedCount,
    completedCount,
    unreadMessagesCount,
    subscribersCount: subscribers.length,
    todayBookingsCount,
  };
};
