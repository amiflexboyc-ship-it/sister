import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Crown, Phone, Menu, X, Calendar, Sparkles } from 'lucide-react';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Registry', path: '/admin' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0806]/95 backdrop-blur-md border-b border-[#d4af37]/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#0a0806]/90 via-[#0a0806]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-full border border-[#d4af37]/40 bg-[#16120b] flex items-center justify-center text-[#d4af37] group-hover:border-[#d4af37] group-hover:scale-105 transition-all shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <Crown className="w-5 h-5 text-[#f5d77f]" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-bold tracking-[0.18em] font-serif-luxury gold-gradient-text block leading-none">
                AURA GOLD
              </span>
              <span className="text-[10px] tracking-[0.28em] text-[#d4af37]/80 uppercase block mt-1">
                Haute Coiffure & Salon
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 text-sm tracking-widest uppercase transition-all duration-200 rounded-md relative ${
                  isActive(link.path)
                    ? 'text-[#f5d77f] font-semibold'
                    : 'text-[#d6c7b2] hover:text-[#f5d77f] hover:bg-[#d4af37]/5'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+447848998911"
              className="flex items-center gap-2 text-xs tracking-wider text-[#ede7dc]/80 hover:text-[#f5d77f] transition-colors py-2 px-3 rounded-full border border-[#d4af37]/15 hover:border-[#d4af37]/40 bg-[#120f0b]/60"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>+44 7848 998911</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="gold-gradient-bg px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_28px_rgba(212,175,55,0.6)]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={onOpenBooking}
              className="gold-gradient-bg px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-[#d4af37]/30 text-[#d4af37] bg-[#120f0b] hover:bg-[#1f1910] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 pb-6 border-t border-[#d4af37]/20 bg-[#0c0a07]/98 backdrop-blur-xl rounded-2xl p-5 shadow-2xl space-y-3 animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base tracking-wider uppercase transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#d4af37]/15 text-[#f5d77f] font-semibold border-l-2 border-[#d4af37]'
                    : 'text-[#d6c7b2] hover:bg-[#d4af37]/10 hover:text-[#f5d77f]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 border-t border-[#d4af37]/15 flex flex-col gap-3">
              <a
                href="tel:+447848998911"
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#d4af37]/25 text-sm text-[#ede7dc]"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>Call Concierge: +44 7848 998911</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full gold-gradient-bg py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Reserve VIP Experience</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
