import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Phone, MapPin, Mail, Clock, Check } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const [emailSub, setEmailSub] = useState('');
  const [subDone, setSubDone] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!emailSub) return;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailSub }),
      });
      setSubDone(true);
      setEmailSub('');
    } catch {
      setSubDone(true);
      setEmailSub('');
    }
  };

  return (
    <footer className="relative bg-[#070605] text-[#ede7dc] pt-20 pb-12 border-t border-[#d4af37]/25 overflow-hidden">
      {/* Decorative ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-column footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-[#d4af37]/15">
          
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-[#d4af37]/50 bg-[#16120b] flex items-center justify-center text-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                <Crown className="w-5 h-5 text-[#f5d77f]" />
              </div>
              <div>
                <span className="text-2xl font-bold tracking-[0.16em] font-serif-luxury gold-gradient-text block leading-none">
                  AURA GOLD
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#d4af37]/80 uppercase block mt-1">
                  Haute Coiffure & Salon
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#a99d8b] leading-relaxed max-w-sm">
              Essex & London’s premier luxury hair atelier. Defining modern elegance through artisanal cornrows, luxury crochet styling, master knotless braiding, and royal bridal transformations.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-[#f5d77f] font-semibold block mb-2">
                Join The Royal Circle
              </span>
              {subDone ? (
                <div className="p-3 rounded-xl bg-[#16120b] border border-[#d4af37]/40 text-xs text-[#f5d77f] flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Welcome to the VIP Guestbook!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder="Enter VIP email..."
                    value={emailSub}
                    onChange={(e) => setEmailSub(e.target.value)}
                    required
                    className="w-full bg-[#13100a] border border-[#d4af37]/30 rounded-xl px-3.5 py-2 text-xs text-[#f5eed3] focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="gold-gradient-bg px-4 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold shrink-0 cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#f5d77f] font-serif-luxury">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#cdc1b0]">
              <li>
                <Link to="/" className="hover:text-[#f5d77f] transition-colors">Home Page</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#f5d77f] transition-colors">Services & Pricing</Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#f5d77f] transition-colors">Hairstyle Portfolio</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#f5d77f] transition-colors">Contact Concierge</Link>
              </li>
              <li>
                <Link to="/services#prices" className="hover:text-[#f5d77f] transition-colors">VIP Memberships</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Signature Styles (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#f5d77f] font-serif-luxury">
              Featured Specialties
            </h4>
            <ul className="space-y-2.5 text-xs text-[#cdc1b0]">
              <li className="flex justify-between items-center pr-4">
                <span>Signature Feed-In Cornrows</span>
                <span className="text-[#f5d77f] font-semibold">£60</span>
              </li>
              <li className="flex justify-between items-center pr-4">
                <span>Luxury Crochet Braids & Curls</span>
                <span className="text-[#f5d77f] font-semibold">£50</span>
              </li>
              <li className="flex justify-between items-center pr-4">
                <span>Imperial Knotless & Boho Braids</span>
                <span className="text-[#f5d77f] font-semibold">£80</span>
              </li>
              <li className="flex justify-between items-center pr-4">
                <span>Haute Bridal Crown Glam</span>
                <span className="text-[#f5d77f] font-semibold">£100</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Atelier Locations & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#f5d77f] font-serif-luxury">
              Salon Location
            </h4>
            <div className="space-y-3 text-xs text-[#cdc1b0]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Westcliff-on-Sea, Southend, Essex, SS0 8AW</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="tel:+447848998911" className="hover:text-[#f5d77f] transition-colors">
                  +44 7848 998911
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href="mailto:nafisatadebayo811@gmail.com" className="hover:text-[#f5d77f] transition-colors break-all">
                  nafisatadebayo811@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2.5 pt-1 border-t border-[#d4af37]/15">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <p>Mon - Sat: 9:00 AM – 7:00 PM</p>
                  <p>Sunday Appointments by Request</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Social */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8d8272]">
          <p>© {CURRENT_YEAR} AURA GOLD HAUTE COIFFURE & SALON. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#d4af37] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#d4af37] cursor-pointer transition-colors">Terms of Service</span>
            <span className="text-[#d4af37] font-semibold">Westcliff-on-Sea • Southend • Essex SS0 8AW</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
