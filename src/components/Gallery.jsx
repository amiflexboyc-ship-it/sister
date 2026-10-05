import React, { useState } from 'react';
import { Sparkles, Maximize2, X, Calendar } from 'lucide-react';
import ladiesBraids1 from '../assets/ladies_braids1.jpg';
import ladiesBraids2 from '../assets/ladies_braids2.jpg';
import ladiesBraids3 from '../assets/ladies_braids3.jpg';
import ladiesBraids4 from '../assets/ladies_braids4.jpg';

const galleryData = [
  {
    id: 1,
    title: 'Imperial Honey-Blonde Knotless Box Braids',
    category: 'Braids',
    price: '£80',
    desc: 'Signature square partings with precision tension, caramel and honey blonde blended braiding extensions, and soft baby hairs.',
    image: ladiesBraids1,
    featured: true,
  },
  {
    id: 2,
    title: 'Goddess Bohemian Knotless Braids',
    category: 'Braids',
    price: '£95',
    desc: 'Waist-length knotless braids accented with cascading bohemian curls & warm golden caramel highlights.',
    image: ladiesBraids2,
  },
  {
    id: 3,
    title: 'French Curl Ombre Bouncy Braids',
    category: 'Braids',
    price: '£90',
    desc: 'Breathtaking French curl braiding hair with bouncy spiral curl ends in warm chestnut and gold ombre.',
    image: ladiesBraids3,
  },
  {
    id: 4,
    title: 'Tribal Stitch Cornrows & Gold Hair Cuffs',
    category: 'Braids',
    price: '£60',
    desc: 'Architectural feed-in stitch cornrows embellished with embossed metallic gold jewelry cuffs and beads.',
    image: ladiesBraids4,
  },
  {
    id: 5,
    title: 'Honey Champagne HD Lace Frontal Melt',
    category: 'Lace & Wigs',
    price: '£85',
    desc: 'Flawless invisible HD lace installation with soft glam body waves, custom bleached knots, and natural baby hairs.',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 6,
    title: 'Velvet Silk Press & High-Gloss Glaze',
    category: 'Styling',
    price: '£65',
    desc: 'Ultra-reflective thermal seal with glass hair fluidity, maximum movement, split-end trim, and healthy edges.',
    image: 'https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 7,
    title: 'Royal Crown Bridal Glam Updo',
    category: 'Bridal',
    price: '£100',
    desc: 'Intricate bridal sculpture accented with 24K gold hairpins, lace melt, and custom sculpted hairline.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 8,
    title: 'Hollywood Sunset Dimensional Waves',
    category: 'Styling',
    price: '£90',
    desc: 'Golden honey highlights and voluminous bouncy barrel curls with heat-defense shield and shine mist.',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Gallery({ onOpenBooking, isPage = false }) {
  const [filter, setFilter] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const categories = ['All', 'Braids', 'Styling', 'Bridal', 'Lace & Wigs'];

  const filteredItems = filter === 'All'
    ? galleryData
    : galleryData.filter(item => item.category === filter);

  return (
    <section id="gallery" className={`relative bg-[#080706] text-[#ede7dc] ${isPage ? 'pt-32 pb-24' : 'py-24'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/30 bg-[#16120b] text-[#f5d77f] text-xs uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Visual Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif-luxury text-[#fdfbf7]">
            The Atelier <span className="gold-gradient-text">Showcase</span>
          </h2>
          <p className="text-[#a89d8d] text-base leading-relaxed">
            Browse through recent transformations executed by our team of master stylists and braiders.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  filter === cat
                    ? 'gold-gradient-bg shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-[#15120c] text-[#a99d8b] border border-[#d4af37]/20 hover:border-[#d4af37]/40 hover:text-[#f5d77f]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden border border-[#d4af37]/25 bg-[#120f0a] cursor-pointer shadow-lg hover:border-[#d4af37]/60 transition-all duration-300"
              onClick={() => setSelectedPhoto(item)}
            >
              {/* Image Container */}
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#18140c]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-[#120f0a]/90 text-[#f5d77f] border border-[#d4af37]/40">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#f5d77f]">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold font-serif-luxury text-[#fdfbf7]">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-[#cdc1b0] line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Bar when not hovered */}
              <div className="p-3 bg-[#120f0a] border-t border-[#d4af37]/10 flex items-center justify-between group-hover:opacity-0 transition-opacity">
                <div>
                  <p className="text-xs font-semibold text-[#ede7dc] truncate max-w-[170px]">{item.title}</p>
                  <p className="text-[10px] text-[#d4af37] uppercase tracking-wider">{item.category} • <span className="font-bold text-[#f5d77f]">{item.price}</span></p>
                </div>
                <span className="text-xs text-[#d4af37]">View</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#080706]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#120f0a] border border-[#d4af37]/50 rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.95)] grid grid-cols-1 md:grid-cols-12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#080706]/80 border border-[#d4af37]/40 text-[#f5d77f] flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lightbox Image (7 cols) */}
            <div className="md:col-span-7 bg-black max-h-[500px] md:max-h-[600px] overflow-hidden flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Lightbox Details (5 cols) */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-block text-xs uppercase font-bold tracking-widest text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30 px-3 py-1 rounded-full">
                    {selectedPhoto.category}
                  </span>
                  <span className="text-xl font-bold font-serif-luxury text-[#f5d77f]">
                    {selectedPhoto.price}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-serif-luxury text-[#fdfbf7]">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-[#cdc1b0] leading-relaxed">
                  {selectedPhoto.desc}
                </p>
                <div className="p-4 rounded-xl bg-[#18140c] border border-[#d4af37]/20 space-y-2 text-xs text-[#a99d8b]">
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                    Styling time: 45m - 3.5 hrs (varies by style)
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                    Complimentary root hydration included
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#d4af37]/20">
                <button
                  onClick={() => {
                    const look = selectedPhoto;
                    setSelectedPhoto(null);
                    if (onOpenBooking) {
                      onOpenBooking({
                        id: look.category.toLowerCase().includes('braid') ? 'braids' : 'silk-press',
                        name: look.title,
                        price: look.price,
                      });
                    }
                  }}
                  className="w-full gold-gradient-bg py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book This Exact Look</span>
                </button>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="w-full py-2.5 text-xs text-[#9d9282] hover:text-[#ede7dc] transition-colors"
                >
                  Back to Gallery
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
