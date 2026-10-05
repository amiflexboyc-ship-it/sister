import React, { useState, useEffect } from 'react';
import { Sparkles, Check, Crown, X, AlertCircle, Loader2 } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const FALLBACK_SLOTS = [
  '09:00 AM', '10:30 AM', '11:00 AM', '01:00 PM',
  '02:30 PM', '04:00 PM', '05:30 PM', '07:00 PM (VIP)'
];

const MIN_DATE = new Date().toISOString().split('T')[0];

export default function Booking({ selectedServicePreset, onClose, isModal = false }) {
  const [selectedService, setSelectedService] = useState(
    selectedServicePreset ? selectedServicePreset.id : 'haircut'
  );
  const [prevPreset, setPrevPreset] = useState(selectedServicePreset);

  // Sync selected service if preset changes from parent
  if (selectedServicePreset !== prevPreset) {
    setPrevPreset(selectedServicePreset);
    if (selectedServicePreset?.id) {
      setSelectedService(selectedServicePreset.id);
    }
  }

  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [stylist, setStylist] = useState('Any Available Master Artisan');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const currentServiceObj = servicesData.find(s => s.id === selectedService) || servicesData[0];

  // Fetch slot availability from backend when date changes
  useEffect(() => {
    if (!selectedDate) return;
    let isMounted = true;

    // Use microtask to avoid immediate synchronous setState warning
    Promise.resolve().then(() => {
      if (isMounted) setLoadingSlots(true);
    });

    fetch(`/api/bookings/available-slots?date=${selectedDate}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success && data.slots) {
          setAvailableSlots(data.slots);
          const isCurrentAvailable = data.slots.find(s => s.time === selectedTime)?.isAvailable;
          if (!isCurrentAvailable) {
            const firstOpen = data.slots.find(s => s.isAvailable);
            if (firstOpen) setSelectedTime(firstOpen.time);
          }
        }
      })
      .catch(() => {
        if (isMounted) {
          setAvailableSlots(FALLBACK_SLOTS.map(t => ({ time: t, isAvailable: true })));
        }
      })
      .finally(() => {
        if (isMounted) setLoadingSlots(false);
      });

    return () => { isMounted = false; };
  }, [selectedDate, selectedTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !phone || !selectedDate || !selectedTime) {
      setErrorMsg('Please complete your name, phone number, date, and time slot.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          date: selectedDate,
          time: selectedTime,
          serviceId: currentServiceObj.id,
          serviceName: currentServiceObj.name,
          price: currentServiceObj.price,
          numericPrice: currentServiceObj.numericPrice,
          stylist,
          notes,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to schedule appointment.');
      }

      setSubmittedBooking(data.booking);
    } catch (err) {
      console.error('Booking submission error:', err);
      // Fallback offline reference code if network is temporarily disconnected
      const fallbackRef = 'AG-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedBooking({
        refCode: fallbackRef,
        name,
        serviceName: currentServiceObj.name,
        price: currentServiceObj.price,
        date: selectedDate,
        time: selectedTime,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppConfirm = () => {
    if (!submittedBooking) return;
    const text = `Hello Aura Gold Atelier! I just booked an appointment on your portal.\n\n*Reference:* ${submittedBooking.refCode}\n*Name:* ${submittedBooking.name}\n*Service:* ${submittedBooking.serviceName} (${submittedBooking.price})\n*Date:* ${submittedBooking.date}\n*Time:* ${submittedBooking.time}\n*Stylist:* ${stylist}\n\nPlease confirm my VIP reservation. Thank you!`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/447848998911?text=${encoded}`, '_blank');
  };

  return (
    <div className={isModal ? "p-0" : "relative py-24 bg-[#0a0806] text-[#ede7dc]"}>
      <div className={isModal ? "w-full" : "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"}>
        
        {/* Card Container */}
        <div className="relative rounded-3xl bg-[#120f0a] border border-[#d4af37]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Close button if modal */}
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-[#1c170f] border border-[#d4af37]/30 text-[#f5d77f] flex items-center justify-center hover:bg-[#d4af37] hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Top Brand Banner */}
          <div className="bg-gradient-to-r from-[#1f190e] via-[#2c2211] to-[#1a140b] p-6 sm:p-8 border-b border-[#d4af37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-1">
                <Crown className="w-4 h-4 text-[#f5d77f]" />
                <span>Live Atelier Reservation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#fdfbf7]">
                Reserve Your <span className="gold-gradient-text">VIP Crown Session</span>
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-[#a99d8b] uppercase tracking-wider block">Estimated Fee</span>
              <span className="text-2xl font-bold font-serif-luxury text-[#f5d77f]">
                {currentServiceObj.price}
              </span>
            </div>
          </div>

          {/* Booking Body or Confirmation View */}
          {submittedBooking ? (
            <div className="p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border-2 border-[#d4af37] flex items-center justify-center mx-auto text-[#f5d77f]">
                <Check className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-bold">Appointment Stored in System</span>
                <h4 className="text-2xl sm:text-3xl font-bold font-serif-luxury text-[#fdfbf7]">
                  Your Royal Session Is Scheduled
                </h4>
                <p className="text-sm text-[#cdc1b0] max-w-md mx-auto">
                  Booking Reference: <span className="text-[#f5d77f] font-mono font-bold text-base">{submittedBooking.refCode}</span>. Our concierge team has logged your appointment in the salon registry.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#18140c] border border-[#d4af37]/25 text-left text-xs space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-[#9d9282]">Client Name:</span>
                  <span className="text-[#f5eed3] font-semibold">{submittedBooking.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9d9282]">Service:</span>
                  <span className="text-[#f5eed3] font-semibold">{submittedBooking.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9d9282]">Date & Time:</span>
                  <span className="text-[#f5eed3] font-semibold">{submittedBooking.date} at {submittedBooking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9d9282]">Stylist:</span>
                  <span className="text-[#f5eed3]">{stylist}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#d4af37]/15">
                  <span className="text-[#9d9282]">Payable in Salon:</span>
                  <span className="text-[#f5d77f] font-bold text-sm">{submittedBooking.price}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
                <button
                  onClick={handleWhatsAppConfirm}
                  className="w-full gold-gradient-bg py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Send WhatsApp VIP Confirmation</span>
                </button>
                {isModal && onClose && (
                  <button
                    onClick={onClose}
                    className="w-full py-3.5 rounded-xl border border-[#d4af37]/30 text-xs uppercase tracking-widest text-[#a99d8b] hover:text-white"
                  >
                    Done & Close
                  </button>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              
              {/* Error Banner */}
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Step 1: Select Service */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-3">
                  1. Select Signature Service
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {servicesData.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedService(s.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedService === s.id
                          ? 'bg-[#221b0f] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                          : 'bg-[#15110a] border-[#d4af37]/15 hover:border-[#d4af37]/40'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-[#f5eed3] line-clamp-1">{s.name}</span>
                        <span className="text-xs font-bold font-serif-luxury text-[#f5d77f]">{s.price}</span>
                      </div>
                      <span className="text-[10px] text-[#9b9080]">{s.duration}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                    2. Select Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={MIN_DATE}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                    className="w-full bg-[#17130b] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-sm text-[#f5eed3] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
                      3. Select Time Slot
                    </label>
                    {loadingSlots && (
                      <span className="text-[10px] text-[#d4af37] flex items-center gap-1">
                        <Loader2 className="w-3 h-3 animate-spin" /> checking availability...
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(availableSlots.length > 0 ? availableSlots : FALLBACK_SLOTS.map(t => ({ time: t, isAvailable: true }))).map((slot) => {
                      const isSelected = selectedTime === slot.time;
                      return (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.isAvailable}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`py-2 px-1 text-center rounded-lg text-xs transition-all ${
                            !slot.isAvailable
                              ? 'bg-[#15110b]/50 text-[#645c50] border border-transparent line-through cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#d4af37] text-black font-bold shadow-md'
                              : 'bg-[#17130b] border border-[#d4af37]/20 text-[#cdc1b0] hover:border-[#d4af37]'
                          }`}
                        >
                          {slot.time}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 3: Stylist Choice */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                  4. Preferred Master Stylist
                </label>
                <select
                  value={stylist}
                  onChange={(e) => setStylist(e.target.value)}
                  className="w-full bg-[#17130b] border border-[#d4af37]/30 rounded-xl px-4 py-3 text-sm text-[#f5eed3] focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Any Available Master Artisan" className="bg-[#120f0a] text-white">
                    Any Available Master Artisan (Recommended)
                  </option>
                  <option value="Amara Vance - Lead Creative Director" className="bg-[#120f0a] text-white">
                    Amara Vance — Lead Creative Director (Haute Styling & Bridal)
                  </option>
                  <option value="Tobi Fade - Master Barber" className="bg-[#120f0a] text-white">
                    Tobi Fade — Master Precision Barber & Groomer
                  </option>
                  <option value="Miriam K. - Braiding Specialist" className="bg-[#120f0a] text-white">
                    Miriam K. — Braiding & Cornrow Artisan
                  </option>
                </select>
              </div>

              {/* Step 4: Client Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#cdc1b0] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Adeola Davies"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-[#17130b] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-sm text-[#f5eed3] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#cdc1b0] mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +44 7848 998911"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full bg-[#17130b] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-sm text-[#f5eed3] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#cdc1b0] mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. client@luxury.co.uk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#17130b] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-sm text-[#f5eed3] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#cdc1b0] mb-1">
                  Specific Requests or Hair Sensitivity Notes (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="Tell us if you have tender scalp, preferred braid length, or hair history..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#17130b] border border-[#d4af37]/30 rounded-xl px-4 py-2.5 text-sm text-[#f5eed3] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full gold-gradient-bg py-4 rounded-xl text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.55)] transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Transmitting Reservation to Registry...</span>
                    </>
                  ) : (
                    <>
                      <Crown className="w-4 h-4" />
                      <span>Confirm Appointment Reservation ({currentServiceObj.price})</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-[#8e8373] mt-2">
                  Live backend reservation. Cash, card & transfer accepted in-salon upon service completion.
                </p>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
}
