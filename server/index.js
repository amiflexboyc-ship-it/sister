import express from 'express';
import cors from 'cors';
import {
  getBookings,
  createBooking,
  updateBookingStatus,
  deleteBooking,
  getMessages,
  createMessage,
  updateMessageStatus,
  deleteMessage,
  addSubscriber,
  getSubscribers,
  getStats,
} from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Aura Gold Haute Coiffure API',
    timestamp: new Date().toISOString(),
  });
});

// Bookings Endpoints
app.get('/api/bookings', (req, res) => {
  try {
    const { date, status } = req.query;
    const bookings = getBookings({ date, status });
    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Check available slots for a given date
app.get('/api/bookings/available-slots', (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, error: 'Date query parameter is required' });
    }
    const allSlots = [
      '09:00 AM', '10:30 AM', '11:00 AM', '01:00 PM',
      '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM (VIP)'
    ];
    const existing = getBookings({ date });
    const bookedTimes = existing
      .filter(b => b.status !== 'cancelled')
      .map(b => b.time);

    const availableSlots = allSlots.map(time => ({
      time,
      isAvailable: !bookedTimes.includes(time),
    }));

    res.json({ success: true, date, slots: availableSlots });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/bookings', (req, res) => {
  try {
    const { name, phone, date, time, serviceName, price, numericPrice, stylist, notes, email } = req.body;

    if (!name || !phone || !date || !time) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, phone, date, and time are mandatory.',
      });
    }

    const booking = createBooking({
      name,
      phone,
      email,
      date,
      time,
      serviceName,
      price,
      numericPrice,
      stylist,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'VIP Appointment successfully scheduled!',
      booking,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/bookings/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const updated = updateBookingStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    res.json({ success: true, message: 'Status updated successfully', booking: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/bookings/:id', (req, res) => {
  try {
    const { id } = req.params;
    deleteBooking(id);
    res.json({ success: true, message: 'Booking removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Messages & Consultation Inquiries
app.get('/api/messages', (req, res) => {
  try {
    const messages = getMessages();
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/messages', (req, res) => {
  try {
    const { name, phone, email, location, subject, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, phone, and message are required.',
      });
    }

    const msg = createMessage({
      name,
      phone,
      email,
      location,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Message delivered to salon concierge.',
      data: msg,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/messages/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = updateMessageStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Message not found' });
    }
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/messages/:id', (req, res) => {
  try {
    const { id } = req.params;
    deleteMessage(id);
    res.json({ success: true, message: 'Message removed successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Newsletter
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid email address required.' });
    }
    const result = addSubscriber(email);
    res.status(201).json({ success: true, message: 'Subscribed to VIP circle.', data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/subscribers', (req, res) => {
  try {
    const subs = getSubscribers();
    res.json({ success: true, count: subs.length, data: subs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Dashboard Analytics / Stats
app.get('/api/stats', (req, res) => {
  try {
    const stats = getStats();
    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Server if run directly
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[Aura Gold Server] REST backend running on http://127.0.0.1:${PORT}`);
  });
}

export default app;
