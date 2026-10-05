import React, { useState } from 'react';
import { Sparkles, Crown, Check, ArrowRight, Star } from 'lucide-react';

export default function Prices({ onOpenBooking }) {
  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'vip'

  const priceSections = [
    {
      title: 'Artisanal Cornrows & Crochet',
      icon: Crown,
      items: [
        { name: 'Signature Feed-In Cornrows', price: '£60', note: 'Clean geometric parting, gentle root tension, golden cuffs included' },
        { name: 'Luxury Crochet Braids & Curls', price: '£50', note: 'Flat protective cornrow base with voluminous curls or pre-looped locs' },
        { name: 'Tribal Stitch Cornrows (4-8 Lines)', price: '£60', note: 'Razor-sharp precision with metallic gold jewelry cuffs and beads' },
        { name: 'Gentle Children & Baby Cornrows', price: '£40', note: 'Ages 12 and under with gentle protective styling & beads' },
      ],
    },
    {
      title: 'Imperial Braids & Installations',
      icon: Sparkles,
      items: [
        { name: 'Knotless Braids (Standard / Mid-Back)', price: '£80', note: 'Featherlight weight with clean geometric parts' },
        { name: 'Goddess / Bohemian Braids (Curly Ends)', price: '£95', note: 'Organic human hair curl insertions included' },
        { name: 'French Curl Ombre Bouncy Braids', price: '£90', note: 'Spiral curl ends in warm chestnut and golden ombre' },
        { name: 'HD Lace Frontal Install & Melt', price: '£85', note: 'Invisible scalp tinting, bleach knots & baby hair' },
      ],
    },
    {
      title: 'Haute Bridal & Crown Suites',
      icon: Star,
      items: [
        { name: 'Imperial Bridal Crown Glam Suite', price: '£100', note: 'Trial session, lace melt, veil setting & emergency kit' },
        { name: 'Bridal Party Styling Suite', price: '£180', note: 'Dedicated session for bride and bridal party' },
        { name: 'Boho Goddess Crown Updo', price: '£85', note: 'Sculpted protective updo with curly tendrils' },
        { name: 'Perimeter Braid & Cornrow Refresh', price: '£35', note: 'Edge touch-up, root oiling & hairline shine mist' },
      ],
    },
  ];

  const vipTiers = [
    {
      name: 'Gold Member Club',
      price: '£150',
      period: 'per month',
      badge: 'Most Popular',
      desc: 'Ideal for regular protective stylers who value priority booking and pristine upkeep in Essex.',
      features: [
        '2 Complete Cornrow, Crochet, or Braiding sessions monthly',
        'Complimentary root hydration wash on every visit',
        '15% discount on all take-home hair care products',
        'Priority scheduling & weekend VIP slot holds',
      ],
    },
    {
      name: 'Imperial Royalty Tier',
      price: '£380',
      period: 'per quarter',
      badge: 'Elite Luxury',
      desc: 'Full-service braiding and styling concierge for brides, professionals, and queens.',
      features: [
        'Unlimited Cornrow touch-ups & Crochet maintenance',
        '1 Premium Knotless Braiding or Bridal Crown session every month',
        'Private VIP Acoustic Suite with complimentary refreshments',
        'Direct 24/7 WhatsApp concierge booking (+44 7848 998911)',
        'Exclusive invitations to atelier product launches',
      ],
    },
  ];

  return (
    <section id="prices" className="relative py-24 bg-[#0a0806] text-[#ede7dc] border-t border-[#d4af37]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#16120b] text-[#f5d77f] text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Transparent Haute Tariffs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#fdfbf7]">
            Pricing & <span className="gold-gradient-text">Memberships</span>
          </h2>
          <p className="text-[#a89d8d] text-base leading-relaxed">
            Uncompromising quality with zero hidden fees. Experience luxury tailored to your lifestyle.
          </p>

          {/* Toggle between Individual and VIP */}
          <div className="inline-flex p-1.5 rounded-full bg-[#14100a] border border-[#d4af37]/25 mt-4">
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                activeTab === 'menu'
                  ? 'gold-gradient-bg text-[#0b0a07] shadow-md'
                  : 'text-[#a99d8b] hover:text-[#ede7dc]'
              }`}
            >
              A La Carte Menu
            </button>
            <button
              onClick={() => setActiveTab('vip')}
              className={`px-6 py-2 rounded-full text-xs uppercase tracking-widest font-semibold transition-all cursor-pointer ${
                activeTab === 'vip'
                  ? 'gold-gradient-bg text-[#0b0a07] shadow-md'
                  : 'text-[#a99d8b] hover:text-[#ede7dc]'
              }`}
            >
              VIP Memberships
            </button>
          </div>
        </div>

        {/* Tab 1: A La Carte Menu */}
        {activeTab === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {priceSections.map((section, idx) => {
              const IconComp = section.icon;
              return (
                <div
                  key={idx}
                  className="gold-box-card rounded-2xl p-7 flex flex-col justify-between"
                >
                  <div>
                    {/* Category Title */}
                    <div className="flex items-center gap-3 pb-5 mb-5 border-b border-[#d4af37]/20">
                      <div className="w-10 h-10 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/35 flex items-center justify-center text-[#f5d77f]">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold font-serif-luxury text-[#fdfbf7]">
                        {section.title}
                      </h3>
                    </div>

                    {/* Price items list */}
                    <div className="space-y-5">
                      {section.items.map((item, i) => (
                        <div key={i} className="group/item">
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="text-sm font-semibold text-[#ede7dc] group-hover/item:text-[#f5d77f] transition-colors">
                              {item.name}
                            </h4>
                            <span className="text-base font-bold font-serif-luxury text-[#f5d77f] shrink-0">
                              {item.price}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#9b9080] mt-1 leading-normal">
                            {item.note}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={onOpenBooking}
                      className="w-full py-3 rounded-xl border border-[#d4af37]/35 text-[#f5eed3] hover:gold-gradient-bg hover:text-[#0b0a07] transition-all text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Select & Book</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: VIP Memberships */}
        {activeTab === 'vip' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {vipTiers.map((tier, idx) => (
              <div
                key={idx}
                className="gold-box-card rounded-3xl p-8 relative flex flex-col justify-between border-2 border-[#d4af37]/40 shadow-2xl"
              >
                <div className="absolute -top-3 right-6 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest gold-gradient-bg">
                  {tier.badge}
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-serif-luxury text-[#fdfbf7] mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#a99d8b] mb-6">
                    {tier.desc}
                  </p>

                  <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-[#d4af37]/20">
                    <span className="text-4xl font-extrabold font-serif-luxury text-[#f5d77f]">
                      {tier.price}
                    </span>
                    <span className="text-xs text-[#9d9282] uppercase tracking-wider">
                      / {tier.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs text-[#ded3c3]">
                        <span className="w-4 h-4 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 text-[#f5d77f]" />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="w-full gold-gradient-bg py-4 rounded-2xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-2xl transition-all"
                >
                  <Crown className="w-4 h-4" />
                  <span>Join Membership Club</span>
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
