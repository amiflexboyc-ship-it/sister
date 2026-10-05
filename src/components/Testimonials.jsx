import React from 'react';
import { Star, Sparkles, CheckCircle2, Quote } from 'lucide-react';
import africanWoman1 from '../assets/african_woman1.jpg';
import africanWoman2 from '../assets/african_woman2.jpg';
import africanWoman3 from '../assets/african_woman3.jpg';

const testimonialsData = [
  {
    name: 'Chidinma Adeleke',
    role: 'Bride & Entrepreneur, Westcliff-on-Sea',
    style: 'Bridal Crown & HD Lace Melt (£100)',
    rating: 5,
    text: 'Aura Gold executed my bridal hair and my baby girl’s braids beyond what I dreamt of. Not a single strand out of place through 14 hours of celebration. Her gentleness with hair and children is truly unmatched in Essex.',
    avatar: africanWoman1,
  },
  {
    name: 'Folashade Adeyemi',
    role: 'Healthcare Professional, Southend',
    style: 'Imperial Knotless Braids (£80)',
    rating: 5,
    text: 'Finding an African hairdresser in Southend who understands tender scalps, knotless braids with zero tension, cornrows, and crochet styling is an absolute blessing. My braids stayed pristine for over two months!',
    avatar: africanWoman2,
  },
  {
    name: 'Zainab Okonjo',
    role: 'Creative Director, Essex',
    style: 'Luxury Crochet Braids & Curls (£50)',
    rating: 5,
    text: 'Zero pain, featherlight braids, and immaculate parts. She styled my toddler with adorable beads and so much patience. The warm golden ambiance in Westcliff makes every appointment feel like royal self-care.',
    avatar: africanWoman3,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 bg-[#080706] text-[#ede7dc] overflow-hidden border-t border-[#d4af37]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#16120b] text-[#f5d77f] text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Royal Accolades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#fdfbf7]">
            Words From <span className="gold-gradient-text">African Women</span>
          </h2>
          <p className="text-[#a89d8d] text-base leading-relaxed">
            Discover why African women and queens across Westcliff-on-Sea, Southend, and Essex trust our atelier for their crowning beauty and protective styling.
          </p>
        </div>

        {/* Testimonials 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item, idx) => (
            <div
              key={idx}
              className="gold-box-card rounded-2xl p-7 relative flex flex-col justify-between"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-[#f5d77f]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f5d77f]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#d4af37]/25" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-[#ded3c3] leading-relaxed mb-6 italic font-light">
                  "{item.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-5 border-t border-[#d4af37]/15 flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#d4af37]/40"
                />
                <div>
                  <h4 className="text-sm font-bold font-serif-luxury text-[#fdfbf7] flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                  </h4>
                  <p className="text-[11px] text-[#a99d8b]">{item.role}</p>
                  <span className="inline-block mt-0.5 text-[10px] text-[#f5d77f] bg-[#d4af37]/10 px-2 py-0.5 rounded-full border border-[#d4af37]/20">
                    {item.style}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verified Badges Bar */}
        <div className="mt-14 p-6 rounded-2xl bg-[#110e09] border border-[#d4af37]/20 flex flex-wrap items-center justify-around gap-6 text-center text-xs text-[#a99d8b]">
          <div>
            <span className="text-lg font-bold text-[#f5d77f] font-serif-luxury block">4.95 / 5.0</span>
            <span>Average Client Rating</span>
          </div>
          <div className="w-[1px] h-8 bg-[#d4af37]/20 hidden sm:block" />
          <div>
            <span className="text-lg font-bold text-[#f5d77f] font-serif-luxury block">1,200+</span>
            <span>Verified Appointments in 2026</span>
          </div>
          <div className="w-[1px] h-8 bg-[#d4af37]/20 hidden sm:block" />
          <div>
            <span className="text-lg font-bold text-[#f5d77f] font-serif-luxury block">100% Satisfaction</span>
            <span>Complimentary Touch-up Guarantee</span>
          </div>
        </div>

      </div>
    </section>
  );
}
