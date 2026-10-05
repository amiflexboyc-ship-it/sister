import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Prices from '../components/Prices';
import Testimonials from '../components/Testimonials';
import Booking from '../components/Booking';
import { Sparkles, ShieldCheck, Crown, Coffee } from 'lucide-react';

export default function Home({ onOpenBooking, onSelectService }) {
  const perks = [
    { icon: Crown, title: 'Master Artisans', desc: 'Precision cuts & painless braids' },
    { icon: Sparkles, title: '24K Scalp Care', desc: 'Organic gold-infused botanicals' },
    { icon: Coffee, title: 'VIP Suites & Bar', desc: 'Complimentary champagne & lattes' },
    { icon: ShieldCheck, title: 'Hospital-Grade Hygiene', desc: 'UV sterilization on every tool' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <Hero onOpenBooking={onOpenBooking} />

      {/* Luxury Value Strip */}
      <section className="bg-[#0e0c08] border-y border-[#d4af37]/20 py-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {perks.map((perk, idx) => {
              const IconComp = perk.icon;
              return (
                <div key={idx} className="flex items-center gap-3.5 group">
                  <div className="w-11 h-11 rounded-xl bg-[#18130b] border border-[#d4af37]/30 flex items-center justify-center text-[#f5d77f] group-hover:scale-110 group-hover:border-[#d4af37] transition-all shrink-0">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#f5eed3] font-serif-luxury">
                      {perk.title}
                    </h4>
                    <p className="text-[11px] text-[#a99d8b] mt-0.5">{perk.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <Services
        onOpenBooking={onOpenBooking}
        onSelectService={onSelectService}
      />

      {/* About Section */}
      <About />

      {/* Gallery Showcase Section */}
      <Gallery onOpenBooking={onOpenBooking} />

      {/* Transparent Prices Section */}
      <Prices onOpenBooking={onOpenBooking} />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Direct In-Page Booking Suite */}
      <section id="booking-section" className="py-20 bg-[#080706] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-2">
              Instant Scheduling
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury text-[#fdfbf7]">
              Secure Your Preferred Time Slot
            </h2>
          </div>
          <Booking isModal={false} />
        </div>
      </section>
    </div>
  );
}
