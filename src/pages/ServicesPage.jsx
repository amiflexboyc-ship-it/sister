import React, { useState } from 'react';
import Services from '../components/Services';
import Prices from '../components/Prices';
import { Crown, Check, ShieldCheck, Calendar } from 'lucide-react';

export default function ServicesPage({ onOpenBooking, onSelectService }) {
  const [selectedAddons, setSelectedAddons] = useState([]);

  const addons = [
    { id: 'steam', name: 'Micro-Mist Scalp Ozone Steam', price: 15, priceStr: '£15', time: '+15 mins' },
    { id: 'beard', name: 'Artisanal Beard Trim & Hot Towel', price: 20, priceStr: '£20', time: '+20 mins' },
    { id: 'plex', name: 'Bond Repair Ampoule (K18 / Olaplex)', price: 25, priceStr: '£25', time: '+15 mins' },
    { id: 'goldmist', name: '24K Gold Shimmer Finishing Mist', price: 10, priceStr: '£10', time: '+5 mins' },
  ];

  const toggleAddon = (id) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const addonTotal = selectedAddons.reduce((sum, id) => {
    const item = addons.find(a => a.id === id);
    return sum + (item ? item.price : 0);
  }, 0);

  return (
    <div className="pt-24 pb-20 bg-[#080706] text-[#ede7dc]">
      
      {/* Services Page Header */}
      <section className="relative py-20 text-center bg-gradient-to-b from-[#14100a] to-[#080706] border-b border-[#d4af37]/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/35 bg-[#17130b] text-[#f5d77f] text-xs uppercase tracking-[0.25em] font-semibold mb-5">
            <Crown className="w-4 h-4 text-[#d4af37]" />
            <span>Curated Haute Treatments</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif-luxury text-[#fdfbf7] mb-6">
            Services & <span className="gold-gradient-text">Artistry Menu</span>
          </h1>
          <p className="text-[#cdc1b0] text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Every appointment begins with a personal hair & scalp analysis to curate a bespoke experience tailored to your unique beauty and crown.
          </p>
        </div>
      </section>

      {/* Main Services Filter Component */}
      <Services
        isPage={true}
        onOpenBooking={onOpenBooking}
        onSelectService={onSelectService}
      />

      {/* Interactive Custom Experience & Add-Ons Builder */}
      <section className="py-20 bg-[#0d0b08] border-y border-[#d4af37]/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold block mb-2">
              Bespoke Customization
            </span>
            <h2 className="text-3xl font-bold font-serif-luxury text-[#fdfbf7]">
              Enhance Your Session With Luxury Add-Ons
            </h2>
            <p className="text-sm text-[#a99d8b] mt-2">
              Select any additional treatments to elevate your salon visit.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {addons.map((addon) => {
              const isSelected = selectedAddons.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  onClick={() => toggleAddon(addon.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#1e180d] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                      : 'bg-[#14100b] border-[#d4af37]/20 hover:border-[#d4af37]/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#d4af37] border-[#d4af37] text-black'
                          : 'border-[#d4af37]/40 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#f5eed3]">{addon.name}</h4>
                      <span className="text-[11px] text-[#9b9080]">{addon.time}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold font-serif-luxury text-[#f5d77f]">
                    {addon.priceStr}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Add-on Summary Card */}
          <div className="p-6 rounded-2xl bg-[#16120b] border border-[#d4af37]/35 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                Selected Add-Ons ({selectedAddons.length})
              </p>
              <p className="text-lg font-bold font-serif-luxury text-[#fdfbf7] mt-0.5">
                Total Add-on Cost: <span className="text-[#f5d77f]">£{addonTotal.toLocaleString()}</span>
              </p>
            </div>
            <button
              onClick={() => {
                if (onOpenBooking) {
                  const names = selectedAddons.map(id => addons.find(a => a.id === id)?.name).filter(Boolean);
                  onOpenBooking({
                    id: 'braids',
                    name: 'Haute Appointment with Add-Ons',
                    price: `From £${80 + addonTotal}`,
                    notes: names.length ? `Selected luxury add-ons (+£${addonTotal}): ${names.join(', ')}` : '',
                  });
                }
              }}
              className="gold-gradient-bg px-7 py-3 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Continue To Booking</span>
            </button>
          </div>

        </div>
      </section>

      {/* Transparent Prices Section */}
      <Prices onOpenBooking={onOpenBooking} />

      {/* Appointment Etiquette & Preparation */}
      <section className="py-20 bg-[#080706]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-[#120f0a] border border-[#d4af37]/30 space-y-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#d4af37]" />
              <h3 className="text-xl font-bold font-serif-luxury text-[#fdfbf7]">
                The Aura Gold Experience Promise
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#cdc1b0] leading-relaxed">
              <div className="space-y-2">
                <span className="text-[#f5d77f] font-semibold block text-sm">1. Scalp First</span>
                <p>We never compromise on hair health. Every chemical or braiding service includes protective barrier balms.</p>
              </div>
              <div className="space-y-2">
                <span className="text-[#f5d77f] font-semibold block text-sm">2. Punctual Hospitality</span>
                <p>We honor your time. Your stylist is reserved strictly for you, eliminating tedious waiting hours.</p>
              </div>
              <div className="space-y-2">
                <span className="text-[#f5d77f] font-semibold block text-sm">3. Maintenance Guidance</span>
                <p>Leave with personalized daily maintenance advice and product recommendations to preserve your look.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
