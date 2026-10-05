import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Booking from './components/Booking';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import { MessageSquare } from 'lucide-react';

// Scroll to top automatically when route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServicePreset, setSelectedServicePreset] = useState(null);

  const handleOpenBooking = (servicePreset = null) => {
    setSelectedServicePreset(servicePreset);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedServicePreset(null);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#080706] text-[#ede7dc] flex flex-col selection:bg-[#d4af37] selection:text-black">
        
        {/* Navigation Bar */}
        <Navbar onOpenBooking={handleOpenBooking} />

        {/* Main Content Router */}
        <main className="flex-1 w-full">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  onOpenBooking={handleOpenBooking}
                  onSelectService={handleOpenBooking}
                />
              }
            />
            <Route
              path="/services"
              element={
                <ServicesPage
                  onOpenBooking={handleOpenBooking}
                  onSelectService={handleOpenBooking}
                />
              }
            />
            <Route
              path="/gallery"
              element={
                <GalleryPage onOpenBooking={handleOpenBooking} />
              }
            />
            <Route
              path="/contact"
              element={
                <ContactPage onOpenBooking={handleOpenBooking} />
              }
            />
            <Route
              path="/admin"
              element={<AdminPage />}
            />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Floating VIP WhatsApp Concierge Button */}
        <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
          <a
            href="https://wa.me/447848998911?text=Hello%20Aura%20Gold%20Concierge!%20I%20would%20like%20to%20inquire%20about%20a%20VIP%20booking."
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#18130b]/90 border border-[#d4af37]/50 text-[#f5d77f] shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] backdrop-blur-md transition-all hover:scale-105"
            aria-label="Direct WhatsApp Concierge"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs uppercase tracking-wider font-semibold hidden sm:inline text-white group-hover:text-[#f5d77f]">
              VIP Concierge
            </span>
            <MessageSquare className="w-4 h-4 text-[#d4af37]" />
          </a>
        </div>

        {/* Global Booking Modal Overlay */}
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 bg-[#080706]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
            <div className="relative w-full max-w-3xl my-8">
              <Booking
                isModal={true}
                selectedServicePreset={selectedServicePreset}
                onClose={handleCloseBooking}
              />
            </div>
          </div>
        )}

      </div>
    </BrowserRouter>
  );
}
