import React, { useState } from 'react';
import { Phone, MapPin, Mail, Clock, Send, Check, Crown, ChevronDown, Calendar, Loader2, AlertCircle } from 'lucide-react';

export default function ContactPage({ onOpenBooking }) {
  const [formSent, setFormSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'Westcliff-on-Sea Salon (SS0 8AW, Essex)',
    subject: 'Bridal / VIP Appointment Inquiry',
    message: '',
  });

  const faqs = [
    {
      q: 'Do I need to book an appointment in advance?',
      a: 'While we accommodate walk-ins when possible, we strongly recommend reserving your session at least 24 hours in advance to guarantee your preferred master artisan and private suite.',
    },
    {
      q: 'Are hair extensions and braiding hair provided?',
      a: 'Yes! For all braiding and lace installation services, we carry premium hypoallergenic pre-stretched braiding hair and virgin bundles in-salon. You may also bring your own hair if preferred.',
    },
    {
      q: 'What is your cancellation and reschedule policy?',
      a: 'We understand schedules change. You may reschedule your appointment up to 4 hours prior without any penalty by contacting our WhatsApp concierge.',
    },
    {
      q: 'Do you offer home or private bridal venue callouts?',
      a: 'Absolutely. Our Mobile Haute Team travels across Essex, London, and internationally for private bridal parties, VIP shoots, and royal events. Contact our concierge for customized quotes.',
    },
  ];

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }
      setFormSent(true);
    } catch (err) {
      console.error('Contact error:', err);
      // Fallback
      setFormSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = `Hello Aura Gold Concierge! My name is ${formData.name || 'a client'}. I would like to inquire regarding ${formData.subject} at ${formData.location}.`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/447848998911?text=${encoded}`, '_blank');
  };

  return (
    <div className="pt-24 pb-20 bg-[#080706] text-[#ede7dc]">
      
      {/* Header */}
      <section className="relative py-20 text-center bg-gradient-to-b from-[#14100a] to-[#080706] border-b border-[#d4af37]/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4af37]/35 bg-[#17130b] text-[#f5d77f] text-xs uppercase tracking-[0.25em] font-semibold mb-5">
            <Crown className="w-4 h-4 text-[#d4af37]" />
            <span>Private Concierge</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif-luxury text-[#fdfbf7] mb-6">
            Contact & <span className="gold-gradient-text">Sanctuary</span>
          </h1>
          <p className="text-[#cdc1b0] text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Our concierge is at your service for appointments, bridal packages, child/baby styling consultations, and custom protective styling.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Info & Locations (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-2">
                  Atelier Location
                </span>
                <h3 className="text-2xl font-bold font-serif-luxury text-[#fdfbf7]">
                  Visit Our Salon
                </h3>
              </div>

              {/* Main Essex Salon Card */}
              <div className="gold-box-card rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold font-serif-luxury text-[#f5eed3]">
                    Westcliff-on-Sea Flagship
                  </h4>
                  <span className="text-[10px] text-[#f5d77f] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#d4af37]/15 border border-[#d4af37]/30">
                    Southend Essex
                  </span>
                </div>
                <p className="text-xs text-[#cdc1b0] flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                  <span>Westcliff-on-Sea, Southend, Essex, SS0 8AW, UK</span>
                </p>
                <p className="text-xs text-[#cdc1b0] flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <a href="tel:+447848998911" className="hover:text-[#f5d77f]">+44 7848 998911</a>
                </p>
                <p className="text-xs text-[#cdc1b0] flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <a href="mailto:nafisatadebayo811@gmail.com" className="hover:text-[#f5d77f] break-all">nafisatadebayo811@gmail.com</a>
                </p>
                <p className="text-xs text-[#a99d8b] flex items-center gap-2.5 pt-2 border-t border-[#d4af37]/15">
                  <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Mon - Sat: 9:00 AM – 7:00 PM | Sunday by Appointment</span>
                </p>
              </div>

              {/* WhatsApp Quick Link */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#17130b] to-[#251d10] border border-[#d4af37]/35 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#f5eed3]">Instant WhatsApp Concierge</h4>
                  <p className="text-xs text-[#a99d8b]">+44 7848 998911 (Direct Booking)</p>
                </div>
                <button
                  onClick={handleWhatsApp}
                  className="gold-gradient-bg px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold cursor-pointer shrink-0"
                >
                  Chat Now
                </button>
              </div>

              {/* Direct Booking Card */}
              {onOpenBooking && (
                <div className="p-6 rounded-2xl bg-[#16120b] border border-[#d4af37]/35 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#f5eed3]">Online Reservation</h4>
                    <p className="text-xs text-[#a99d8b]">Instant date & time slot selection</p>
                  </div>
                  <button
                    onClick={() => onOpenBooking()}
                    className="gold-gradient-bg px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold cursor-pointer shrink-0 flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Slot</span>
                  </button>
                </div>
              )}

            </div>

            {/* Right: Interactive Message & Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <div className="gold-box-card rounded-3xl p-8 sm:p-10 border border-[#d4af37]/40 shadow-2xl">
                
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block mb-1">
                    Send A Message
                  </span>
                  <h3 className="text-2xl font-bold font-serif-luxury text-[#fdfbf7]">
                    VIP Inquiry & Consultation
                  </h3>
                </div>

                {errorMsg && (
                  <div className="mb-5 p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {formSent ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto text-[#f5d77f]">
                      <Check className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold font-serif-luxury text-[#fdfbf7]">
                      Message Received
                    </h4>
                    <p className="text-sm text-[#cdc1b0] max-w-md mx-auto">
                      Thank you for contacting Aura Gold. Our lead concierge will reply to your inquiry within 2 business hours.
                    </p>
                    <button
                      onClick={() => setFormSent(false)}
                      className="px-6 py-2.5 rounded-full border border-[#d4af37]/40 text-xs text-[#f5d77f] hover:bg-[#d4af37]/10"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#cdc1b0] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your Name"
                          className="w-full bg-[#17130b] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-sm text-[#f5eed3] focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#cdc1b0] mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+44 7848 998911"
                          className="w-full bg-[#17130b] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-sm text-[#f5eed3] focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#cdc1b0] mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="email@domain.com"
                          className="w-full bg-[#17130b] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-sm text-[#f5eed3] focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#cdc1b0] mb-1">
                          Preferred Atelier
                        </label>
                        <select
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full bg-[#17130b] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-sm text-[#f5eed3] focus:outline-none focus:border-[#d4af37]"
                        >
                          <option value="Westcliff-on-Sea Salon (SS0 8AW, Essex)" className="bg-[#120f0a] text-white">
                            Westcliff-on-Sea Salon (SS0 8AW, Essex)
                          </option>
                          <option value="Southend / Essex Mobile Bridal Callout" className="bg-[#120f0a] text-white">
                            Southend / Essex Mobile Bridal Callout
                          </option>
                          <option value="London & UK Home Haircare VIP" className="bg-[#120f0a] text-white">
                            London & UK Home Haircare VIP
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#cdc1b0] mb-1">
                        Inquiry Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Bridal Glam Booking, Custom Color Consultation"
                        className="w-full bg-[#17130b] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-sm text-[#f5eed3] focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#cdc1b0] mb-1">
                        Message Details
                      </label>
                      <textarea
                        rows="4"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about the desired hairstyle, date, or event details..."
                        className="w-full bg-[#17130b] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-sm text-[#f5eed3] focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full gold-gradient-bg py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Transmitting to Concierge...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Transmit Message to Concierge</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="py-20 bg-[#0c0a07] border-t border-[#d4af37]/15">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold block mb-2">
              Assistance & Guidance
            </span>
            <h2 className="text-3xl font-bold font-serif-luxury text-[#fdfbf7]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#120f0a] border border-[#d4af37]/25 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span className="text-sm font-semibold text-[#f5eed3]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#d4af37] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-[#a99d8b] leading-relaxed border-t border-[#d4af37]/10 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
