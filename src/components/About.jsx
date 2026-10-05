import React from 'react';
import { Award, ShieldCheck, Sparkles, Crown } from 'lucide-react';
import salonImg from '../assets/salon.jpg';

export default function About() {
  const pillars = [
    {
      title: 'Artisan Precision',
      desc: 'Every scissor stroke, braid parting, and color blend is executed with architectural symmetry.',
      icon: Crown,
    },
    {
      title: '24K Scalp Alchemy',
      desc: 'We nourish the foundation of hair using organic botanical extracts and micro-nourishing oils.',
      icon: Sparkles,
    },
    {
      title: 'Private Royal Suites',
      desc: 'Unwind in tranquil acoustic luxury suites with complimentary refreshments and bespoke consultation.',
      icon: ShieldCheck,
    },
    {
      title: 'Global Master Stylists',
      desc: 'Our team is trained across London, Essex, and African haute couture hair institutions.',
      icon: Award,
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#0a0806] text-[#ede7dc] overflow-hidden border-t border-[#d4af37]/10">
      {/* Decorative Gold Rings */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual Collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Golden frame background */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#d4af37]/25 via-transparent to-[#aa821f]/20 blur-lg" />

              {/* Main Salon Image */}
              <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/40 shadow-2xl bg-[#120f0a]">
                <img
                  src={salonImg}
                  alt="Aura Gold Luxury Salon Interior"
                  className="w-full h-[480px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1000&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-transparent opacity-70" />
                
                {/* Floating badge inside image */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#0e0c08]/90 backdrop-blur-md border border-[#d4af37]/30">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#f5d77f]">
                      <Crown className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">The Sanctuary</p>
                      <p className="text-xs text-[#cdc1b0]">Designed for pure serenity, privacy, and indulgence.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-5 -right-5 bg-[#16120b] border border-[#d4af37]/60 p-4 rounded-2xl shadow-2xl hidden sm:block">
                <div className="text-2xl font-bold font-serif-luxury text-[#f5d77f]">10+ Years</div>
                <div className="text-[10px] text-[#a99d8b] uppercase tracking-wider">Haute Coiffure Craft</div>
              </div>

            </div>
          </div>

          {/* Right Editorial Story (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#16120b] text-[#f5d77f] text-xs uppercase tracking-[0.25em] font-semibold">
              <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Our Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#fdfbf7] leading-tight">
              Crafting Crowns for <br />
              <span className="gold-gradient-text">Modern Queens & Kings</span>
            </h2>

            <p className="text-[#cdc1b0] text-base leading-relaxed font-light">
              Founded on the belief that hair is your most intimate crown, Aura Gold redefines salon culture with a lavish blend of timeless African heritage techniques and avant-garde international styling.
            </p>

            <p className="text-[#a89d8d] text-sm leading-relaxed">
              Whether sculpturing a clean razor fade, braiding meticulous stitch patterns that last for weeks, or preparing a bride for her most unforgettable walk, we provide an extraordinary ritual of care, confidence, and distinction.
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {pillars.map((pillar, idx) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#120f0a]/80 border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d77f]">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-bold font-serif-luxury text-[#f5eed3]">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#a99d8b] leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Quote Signature */}
            <div className="pt-4 border-t border-[#d4af37]/15 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#d4af37]/40 overflow-hidden shrink-0 bg-[#16120b]">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                  alt="Creative Director"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs italic text-[#ded3c3]">
                  "Hair isn't just about appearance; it is your identity, power, and sacred self-expression."
                </p>
                <p className="text-xs font-semibold text-[#f5d77f] font-serif-luxury mt-1">
                  Nafisat Adebayo — Creative Director & Master Artisan
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
