import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, ArrowRight, Check, Flame } from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function Services({ onSelectService, onOpenBooking, isPage = false }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Braids', 'Cornrows', 'Crochet', 'Bridal'];

  const filteredServices = activeCategory === 'All'
    ? servicesData
    : servicesData.filter(s => s.category === activeCategory);

  const handleBook = (service) => {
    if (onSelectService) {
      onSelectService(service);
    } else if (onOpenBooking) {
      onOpenBooking(service);
    }
  };

  return (
    <section id="services" className={`relative bg-[#080706] text-[#ede7dc] ${isPage ? 'pt-32 pb-24' : 'py-24'}`}>
      {/* Decorative backdrop light */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-[#aa821f]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#16120b] text-[#f5d77f] text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Master Crafted Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#fdfbf7]">
            Exquisite Hair <span className="gold-gradient-text">Experiences</span>
          </h2>
          <p className="text-[#a89d8d] text-base leading-relaxed">
            Every appointment is an individualized masterclass in styling, crafted with premium gold-infused botanicals and unparalleled attention to detail.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'gold-gradient-bg shadow-[0_0_18px_rgba(212,175,55,0.4)]'
                    : 'bg-[#15120c] text-[#c7b9a5] border border-[#d4af37]/20 hover:border-[#d4af37]/50 hover:text-[#f5d77f]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`gold-box-card rounded-2xl p-7 flex flex-col justify-between relative group ${
                service.popular ? 'border-[#d4af37]/50 ring-1 ring-[#d4af37]/30' : ''
              }`}
            >
              {/* Popular / Specialty Ribbon */}
              {service.popular && (
                <div className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest gold-gradient-bg shadow-lg flex items-center gap-1.5">
                  <Flame className="w-3 h-3 text-[#0b0a07] fill-current" />
                  <span>Popular</span>
                </div>
              )}

              <div>
                {/* Header inside Card */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#d4af37] block mb-1">
                      {service.tag}
                    </span>
                    <h3 className="text-xl font-bold font-serif-luxury text-[#fdfbf7] group-hover:text-[#f5d77f] transition-colors">
                      {service.name}
                    </h3>
                  </div>
                </div>

                {/* Price and Duration */}
                <div className="flex items-baseline gap-3 mb-5 pb-5 border-b border-[#d4af37]/15">
                  <span className="text-3xl font-extrabold font-serif-luxury text-[#f5d77f]">
                    {service.price}
                  </span>
                  <span className="text-xs text-[#9d9282] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]/70" />
                    {service.duration}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-[#bab0a1] leading-relaxed mb-6 font-light">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2.5 mb-8">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#ded3c3]">
                      <span className="w-4 h-4 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#f5d77f]" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book Button */}
              <button
                onClick={() => handleBook(service)}
                className="w-full py-3 px-4 rounded-xl border border-[#d4af37]/40 text-[#f5eed3] group-hover:gold-gradient-bg group-hover:text-[#0b0a07] transition-all text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reserve This Style</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Banner if on Home */}
        {!isPage && (
          <div className="mt-14 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#d4af37]/30 text-sm tracking-wider uppercase text-[#f5d77f] hover:bg-[#d4af37]/10 transition-colors"
            >
              <span>Explore Complete Services & Add-Ons</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
