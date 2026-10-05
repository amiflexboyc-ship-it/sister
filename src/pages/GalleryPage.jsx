import React from 'react';
import Gallery from '../components/Gallery';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import ladiesBraids1 from '../assets/ladies_braids1.jpg';
import ladiesBraids2 from '../assets/ladies_braids2.jpg';

export default function GalleryPage({ onOpenBooking }) {
  const transformations = [
    {
      title: 'Honey-Blonde Knotless Box Braids (£80)',
      time: 'Signature Ladies Protective Style',
      desc: 'Flawless square parting with gentle root tension, blended caramel highlights, and soft laid baby hairs.',
      image: ladiesBraids1,
    },
    {
      title: 'Imperial Goddess Bohemian Braids (£95)',
      time: 'Waist-Length Transformation',
      desc: 'Featherweight tension-free knotless installation with bohemian curls and organic rosemary root oil.',
      image: ladiesBraids2,
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#080706] text-[#ede7dc]">
      
      {/* Header */}
      <section className="relative py-20 text-center bg-gradient-to-b from-[#14100a] to-[#080706] border-b border-[#d4af37]/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/35 bg-[#17130b] text-[#f5d77f] text-xs uppercase tracking-[0.25em] font-semibold mb-5">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span>Ladies Haute Coiffure Archive</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif-luxury text-[#fdfbf7] mb-6">
            Ladies Hairstyle & Beauty <span className="gold-gradient-text">Lookbook</span>
          </h1>
          <p className="text-[#cdc1b0] text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Witness the craftsmanship of our master braiders and stylists. Click on any ladies hairstyle to inspect high-definition details or reserve that exact style.
          </p>
        </div>
      </section>

      {/* Gallery Component */}
      <Gallery isPage={true} onOpenBooking={onOpenBooking} />

      {/* Featured Transformations Showcase */}
      <section className="py-20 bg-[#0c0a07] border-t border-[#d4af37]/15">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold block mb-2">
              Transformative Artistry
            </span>
            <h2 className="text-3xl font-bold font-serif-luxury text-[#fdfbf7]">
              Signature Hair Journeys
            </h2>
            <p className="text-sm text-[#a99d8b] mt-2">
              Real results powered by expert precision and scalp nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {transformations.map((trans, idx) => (
              <div
                key={idx}
                className="gold-box-card rounded-3xl overflow-hidden border border-[#d4af37]/30 flex flex-col justify-between"
              >
                <div className="h-72 w-full overflow-hidden bg-[#18140c] relative">
                  <img
                    src={trans.image}
                    alt={trans.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0c0a07]/85 border border-[#d4af37]/40 text-[10px] text-[#f5d77f] uppercase font-bold tracking-wider">
                    {trans.time}
                  </div>
                </div>
                <div className="p-6 sm:p-8 space-y-3">
                  <h3 className="text-xl font-bold font-serif-luxury text-[#fdfbf7]">
                    {trans.title}
                  </h3>
                  <p className="text-xs text-[#cdc1b0] leading-relaxed">
                    {trans.desc}
                  </p>
                  <button
                    onClick={onOpenBooking}
                    className="pt-2 text-xs uppercase tracking-widest font-semibold text-[#f5d77f] hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>Request Similar Style</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Booking Banner */}
          <div className="mt-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1b150c] via-[#2a2010] to-[#16120a] border border-[#d4af37]/40 text-center space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#fdfbf7]">
              Ready for Your Own Crowning Transformation?
            </h3>
            <p className="text-sm text-[#cdc1b0] max-w-xl mx-auto">
              Our stylists are ready to consult, custom-blend colors, and sculpt your vision into reality.
            </p>
            <button
              onClick={onOpenBooking}
              className="gold-gradient-bg px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold inline-flex items-center gap-2 cursor-pointer shadow-xl hover:shadow-2xl"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Your Session Now</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
