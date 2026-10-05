import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, ArrowRight, Star, Crown } from 'lucide-react';
import heroImg from '../assets/hero.jpg';

export default function Hero({ onOpenBooking }) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#080706]">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#aa821f]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative Golden Grid / Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.08)_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            {/* Luxury Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/35 bg-[#17130b]/80 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#f5d77f] animate-pulse" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#f5d77f] font-semibold">
                Haute Coiffure & Luxury Grooming
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold font-serif-luxury leading-[1.08] tracking-tight text-[#fdfbf7]">
              Where Royalty Meets <br className="hidden sm:inline" />
              <span className="gold-gradient-text">Master Artistry.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#cdc1b0] max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Step into an enclave of dark luxury and bespoke hair styling. From intricate artisanal cornrows and celestial knotless braids to luxury crochet styling and bridal transformations, we craft beauty with imperial perfection.
            </p>

            {/* Service Price Quick-Glance */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="px-3.5 py-1.5 rounded-lg border border-[#d4af37]/20 bg-[#120f0a]/70 text-xs text-[#ded3c3]">
                Cornrows from <span className="text-[#f5d77f] font-semibold">£60</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg border border-[#d4af37]/20 bg-[#120f0a]/70 text-xs text-[#ded3c3]">
                Crochet from <span className="text-[#f5d77f] font-semibold">£50</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg border border-[#d4af37]/20 bg-[#120f0a]/70 text-xs text-[#ded3c3]">
                Braids from <span className="text-[#f5d77f] font-semibold">£80</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg border border-[#d4af37]/20 bg-[#120f0a]/70 text-xs text-[#ded3c3]">
                Bridal & Glam from <span className="text-[#f5d77f] font-semibold">£100</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto gold-gradient-bg px-8 py-4 rounded-full text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-3 cursor-pointer shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve VIP Session</span>
              </button>

              <Link
                to="/services"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-[#d4af37]/40 text-[#f5eed3] hover:text-[#f5d77f] hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all text-sm uppercase tracking-widest font-medium flex items-center justify-center gap-2"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37]" />
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#d4af37]/15 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#f5d77f]">15k+</div>
                <div className="text-xs text-[#9d9282] uppercase tracking-wider mt-0.5">Styled Royals</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#f5d77f] flex items-center justify-center lg:justify-start gap-1">
                  4.95 <Star className="w-4 h-4 fill-[#f5d77f] text-[#f5d77f]" />
                </div>
                <div className="text-xs text-[#9d9282] uppercase tracking-wider mt-0.5">500+ Reviews</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#f5d77f]">100%</div>
                <div className="text-xs text-[#9d9282] uppercase tracking-wider mt-0.5">VIP Privacy</div>
              </div>
            </div>

          </div>

          {/* Right Visual Image Showcase (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none">
              
              {/* Outer Golden Glow Ring */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#d4af37]/30 via-transparent to-[#d4af37]/20 blur-xl opacity-75" />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#d4af37]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] bg-[#120f0a]">
                <img
                  src={heroImg}
                  alt="Aura Gold Luxury Hair Salon"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    // Fallback to high-res salon photo if local file has issue
                    e.currentTarget.src = "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=1000&q=80";
                  }}
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-transparent opacity-80" />

                {/* Floating Card at Bottom */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0c0a07]/90 backdrop-blur-md border border-[#d4af37]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#20190e] border border-[#d4af37]/50 flex items-center justify-center">
                      <Crown className="w-5 h-5 text-[#f5d77f]" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Signature Atelier</p>
                      <p className="text-sm font-medium text-[#f5eed3]">Westcliff-on-Sea, Southend Essex SS0 8AW</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Open Today
                    </span>
                  </div>
                </div>

              </div>

              {/* Floating Award Accent */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-[#18140c]/95 backdrop-blur-md border border-[#d4af37]/50 p-3.5 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#f5d77f]">
                  ★
                </div>
                <div>
                  <div className="text-xs font-bold text-[#f5d77f] font-serif-luxury">No. 1 Luxury Salon</div>
                  <div className="text-[10px] text-[#a99d8b]">Excellence Awards 2026</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
