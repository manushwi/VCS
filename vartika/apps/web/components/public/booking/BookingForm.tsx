"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SERVICES } from "@/lib/constants/index";
import { CITIES } from "@/lib/constants/index";

interface FormData {
  service: string;
  servicePrice: string;
  date: string;
  city: string;
  timeSlot: string;
  propertySize: string;
  propertyType: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  notes: string;
  source: string;
}

function priceLabel(svc: (typeof SERVICES)[number]) {
  return svc.pricingModel === "per_sqft"
    ? `₹${svc.basePrice}/${svc.pricingUnit}`
    : `₹${svc.basePrice}/${svc.pricingUnit}`;
}

const defaultSvc = SERVICES[0];
const initialForm: FormData = {
  service: defaultSvc.name,
  servicePrice: priceLabel(defaultSvc),
  date: "",
  city: "",
  timeSlot: "Morning (8–12)",
  propertySize: "",
  propertyType: "Home",
  name: "",
  phone: "",
  whatsapp: "",
  email: "",
  notes: "",
  source: "",
};

export default function BookingForm({
  initialService,
}: {
  initialService?: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);

  useEffect(() => {
    if (initialService) {
      const match = SERVICES.find((s) => s.slug === initialService);
      if (match) {
        setForm((prev) => ({
          ...prev,
          service: match.name,
          servicePrice: priceLabel(match),
        }));
      }
    }
  }, [initialService]);

  const selectedService = SERVICES.find((s) => s.name === form.service);
  const isAreaPriced = selectedService?.pricingModel === "per_sqft";
  const [sizeUnit, setSizeUnit] = useState<"sq.ft" | "sq.m">("sq.ft");

  const propertyUnit = isAreaPriced ? sizeUnit : "seats";
  const propertyLabel = isAreaPriced ? "Area" : "Number of Seats";
  const propertyPlaceholder = isAreaPriced ? "e.g. 500" : "e.g. 3";
  const propertyInputType = isAreaPriced ? "number" : "number";

  const update = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleServiceSelect = (svc: (typeof SERVICES)[number]) => {
    update("service", svc.name);
    update("servicePrice", priceLabel(svc));
    update("propertySize", "");
  };

  const handleSubmit = async () => {
    // TODO: Submit to Supabase
    // const { error } = await supabase.from("bookings").insert({ ... });
    router.push("/thank-you");
  };

  const StepDot = ({ num, label }: { num: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all relative z-[1] ${
          num < step
            ? "bg-accent text-white border-accent"
            : num === step
            ? "bg-accent text-white border-accent"
            : "bg-bg3 text-ink4 border-[1.5px] border-bd2"
        }`}
      >
        {num}
      </div>
      <div
        className={`text-[11px] tracking-widest uppercase mt-1.5 text-center whitespace-nowrap ${
          num <= step ? "text-accent" : "text-ink4"
        }`}
      >
        {label}
      </div>
    </div>
  );

  const StepLine = ({ active }: { active: boolean }) => (
    <div
      className={`w-20 h-[1.5px] transition-all max-md:w-10 ${active ? "bg-accent" : "bg-bd2"}`}
      style={{ marginTop: "-18px" }}
    />
  );

  return (
    <>
      {/* Progress */}
      <div className="flex items-center justify-center mb-14">
        <StepDot num={1} label="Service" />
        <StepLine active={step > 1} />
        <StepDot num={2} label="Schedule" />
        <StepLine active={step > 2} />
        <StepDot num={3} label="Details" />
        <StepLine active={step > 3} />
        <StepDot num={4} label="Confirm" />
      </div>

      <div className="flex gap-8 items-start max-md:flex-col">
        <div className="flex-1">
          {/* Step 1: Service */}
          {step === 1 && (
            <div>
              <h3 className="font-serif text-[28px] font-normal text-ink mb-8">
                Choose your service
              </h3>
              <div className="grid grid-cols-4 gap-3.5 mb-9 max-md:grid-cols-2">
                {SERVICES.map((svc) => (
                  <button
                    key={svc.slug}
                    className={`border-[1.5px] rounded-12 p-5 cursor-pointer transition-all text-left bg-bg ${
                      form.service === svc.name
                        ? "border-accent bg-[rgba(61,89,72,0.07)]"
                        : "border-bd2 hover:border-accent hover:bg-[rgba(61,89,72,0.07)]"
                    }`}
                    onClick={() => handleServiceSelect(svc)}
                  >
                    <div className="text-2xl mb-2.5">{svc.icon}</div>
                    <div className="text-sm font-semibold text-ink mb-1">
                      {svc.name}
                    </div>
                    <div className="font-mono text-sm text-accent">
                      from {priceLabel(svc)}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  className="btn inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(61,89,72,0.2)] hover:bg-accent2 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(61,89,72,0.3)] transition-all"
                  onClick={() => setStep(2)}
                >
                  Next: Schedule →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div>
              <h3 className="font-serif text-[28px] font-normal text-ink mb-8">
                Choose date &amp; time
              </h3>
              <div className="flex gap-5 mb-5 max-md:flex-col">
                <div className="flex-1">
                  <label className="block text-xs tracking-widest uppercase text-ink3 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    className="w-full h-12 bg-bg border border-bd2 rounded-8 px-4 text-[15px] text-ink outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(61,89,72,0.1)]"
                    value={form.date}
                    onChange={(e) => update("date", e.target.value)}
                    style={{ colorScheme: "light" }}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs tracking-widest uppercase text-ink3 mb-2">
                    City
                  </label>
                  <select
                    className="w-full h-12 bg-bg border border-bd2 rounded-8 px-4 text-[15px] text-ink outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(61,89,72,0.1)]"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                  >
                    <option value="" disabled>
                      Select city
                    </option>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-xs tracking-widest uppercase text-ink3 mb-2">
                  Time Slot
                </label>
                <div className="flex gap-2 flex-wrap">
                  {["Morning (8–12)", "Afternoon (12–4)", "Evening (4–8)"].map(
                    (slot) => (
                      <button
                        key={slot}
                        className={`px-5 py-2.5 border-[1.5px] rounded-full text-sm cursor-pointer transition-all ${
                          form.timeSlot === slot
                            ? "bg-accent text-white border-accent"
                            : "border-bd2 text-ink2 hover:bg-accent hover:text-white hover:border-accent"
                        }`}
                        onClick={() => update("timeSlot", slot)}
                      >
                        {slot}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex-1">
                  <label className="block text-xs tracking-widest uppercase text-ink3 mb-2">
                    {propertyLabel}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type={propertyInputType}
                      min="1"
                      placeholder={propertyPlaceholder}
                      className="flex-1 h-12 bg-bg border border-bd2 rounded-8 px-4 text-[15px] text-ink outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(61,89,72,0.1)] placeholder:text-ink4"
                      value={form.propertySize}
                      onChange={(e) => update("propertySize", e.target.value)}
                    />
                    {isAreaPriced && (
                      <div className="flex gap-1 shrink-0">
                        {(["sq.ft", "sq.m"] as const).map((unit) => (
                          <button
                            key={unit}
                            className={`h-12 px-4 border-[1.5px] rounded-8 text-sm font-medium cursor-pointer transition-all ${
                              sizeUnit === unit
                                ? "bg-accent text-white border-accent"
                                : "border-bd2 text-ink2 hover:border-accent"
                            }`}
                            onClick={() => setSizeUnit(unit)}
                          >
                            {unit}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs tracking-widest uppercase text-ink3 mb-2">
                    Property Type
                  </label>
                  <div className="flex gap-2">
                    {["Home", "Office"].map((t) => (
                      <button
                        key={t}
                        className={`px-5 py-2.5 border-[1.5px] rounded-full text-sm cursor-pointer transition-all ${
                          form.propertyType === t
                            ? "bg-accent text-white border-accent"
                            : "border-bd2 text-ink2 hover:bg-accent hover:text-white hover:border-accent"
                        }`}
                        onClick={() => update("propertyType", t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-9">
                <button
                  className="btn inline-flex items-center gap-2 bg-transparent text-ink px-7 py-3.5 rounded-full text-sm font-medium tracking-wide border border-bd2 hover:border-accent hover:text-accent transition-all"
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                <button
                  className="btn inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(61,89,72,0.2)] hover:bg-accent2 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(61,89,72,0.3)] transition-all"
                  onClick={() => setStep(3)}
                >
                  Next: Your Details →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div>
              <h3 className="font-serif text-[28px] font-normal text-ink mb-8">
                Your contact details
              </h3>
              <div className="mb-5">
                <label className="block text-xs tracking-widest uppercase text-ink3 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Priya Malhotra"
                  className="w-full h-12 bg-bg border border-bd2 rounded-8 px-4 text-[15px] text-ink outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(61,89,72,0.1)] placeholder:text-ink4"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                />
              </div>
              <div className="flex gap-5 mb-5 max-md:flex-col">
                <div className="flex-1">
                  <label className="block text-xs tracking-widest uppercase text-ink3 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full h-12 bg-bg border border-bd2 rounded-8 px-4 text-[15px] text-ink outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(61,89,72,0.1)] placeholder:text-ink4"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs tracking-widest uppercase text-ink3 mb-2">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="Same as above"
                    className="w-full h-12 bg-bg border border-bd2 rounded-8 px-4 text-[15px] text-ink outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(61,89,72,0.1)] placeholder:text-ink4"
                    value={form.whatsapp}
                    onChange={(e) => update("whatsapp", e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-xs tracking-widest uppercase text-ink3 mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full h-12 bg-bg border border-bd2 rounded-8 px-4 text-[15px] text-ink outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(61,89,72,0.1)] placeholder:text-ink4"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className="block text-xs tracking-widest uppercase text-ink3 mb-2">
                  Special Instructions
                </label>
                <textarea
                  placeholder="Any specific requirements, access details, or notes for our team..."
                  className="w-full bg-bg border border-bd2 rounded-8 px-4 py-3.5 text-[15px] text-ink outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(61,89,72,0.1)] placeholder:text-ink4 resize-vertical min-h-[100px]"
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className="block text-xs tracking-widest uppercase text-ink3 mb-2">
                  How did you hear about us?
                </label>
                <select
                  className="w-full h-12 bg-bg border border-bd2 rounded-8 px-4 text-[15px] text-ink outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(61,89,72,0.1)]"
                  value={form.source}
                  onChange={(e) => update("source", e.target.value)}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option>Google Search</option>
                  <option>WhatsApp</option>
                  <option>Friend / Referral</option>
                  <option>Instagram</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex justify-between mt-9">
                <button
                  className="btn inline-flex items-center gap-2 bg-transparent text-ink px-7 py-3.5 rounded-full text-sm font-medium tracking-wide border border-bd2 hover:border-accent hover:text-accent transition-all"
                  onClick={() => setStep(2)}
                >
                  ← Back
                </button>
                <button
                  className="btn inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(61,89,72,0.2)] hover:bg-accent2 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(61,89,72,0.3)] transition-all"
                  onClick={() => setStep(4)}
                >
                  Review Booking →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div>
              <h3 className="font-serif text-[28px] font-normal text-ink mb-8">
                Confirm your booking
              </h3>
              <div className="bg-bg2 rounded-16 p-7 border border-bd mb-6">
                <div className="flex justify-between py-2.5 border-b border-bd text-sm">
                  <span className="text-ink3">Service</span>
                  <span className="text-ink font-medium">{form.service}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-bd text-sm">
                  <span className="text-ink3">Date</span>
                  <span className="text-ink font-medium">
                    {form.date
                      ? new Date(form.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-bd text-sm">
                  <span className="text-ink3">Time</span>
                  <span className="text-ink font-medium">{form.timeSlot}</span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-bd text-sm">
                  <span className="text-ink3">City</span>
                  <span className="text-ink font-medium">
                    {form.city || "—"}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-bd text-sm">
                  <span className="text-ink3">{propertyLabel}</span>
                  <span className="text-ink font-medium">
                    {form.propertySize ? `${form.propertySize} ${propertyUnit}` : "—"}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 text-sm">
                  <span className="text-ink3">Name</span>
                  <span className="text-ink font-medium">
                    {form.name || "—"}
                  </span>
                </div>
              </div>
              <p className="text-sm text-ink3 leading-relaxed mb-2">
                By submitting, our team will contact you within 2 hours to
                confirm the appointment. No payment is required at this stage.
              </p>
              <p className="text-xs text-ink4">🔒 Your information is secure and will never be shared.</p>
              <div className="flex justify-between mt-5">
                <button
                  className="btn inline-flex items-center gap-2 bg-transparent text-ink px-7 py-3.5 rounded-full text-sm font-medium tracking-wide border border-bd2 hover:border-accent hover:text-accent transition-all"
                  onClick={() => setStep(3)}
                >
                  ← Edit Details
                </button>
              </div>
              <button
                className="w-full h-13 bg-accent text-white rounded-full text-[15px] font-semibold mt-9 hover:bg-accent2 hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(61,89,72,0.3)] transition-all cursor-pointer"
                onClick={handleSubmit}
              >
                Confirm Booking Request
              </button>
            </div>
          )}
        </div>

        {/* Sticky Summary */}
        <div className="flex-[0_0_300px] bg-bg2 rounded-16 p-7 border border-bd sticky top-[100px] max-md:flex-none max-md:w-full max-md:relative max-md:top-auto">
          <div className="font-serif text-lg text-ink mb-5">
            Booking Summary
          </div>
          <div className="flex justify-between py-2.5 border-b border-bd text-sm">
            <span className="text-ink3">Service</span>
            <span className="text-ink font-medium">{form.service}</span>
          </div>
          <div className="flex justify-between py-2.5 border-b border-bd text-sm">
            <span className="text-ink3">Date</span>
            <span className="text-ink font-medium">
              {form.date
                ? new Date(form.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Not selected"}
            </span>
          </div>
          <div className="flex justify-between py-2.5 border-b border-bd text-sm">
            <span className="text-ink3">City</span>
            <span className="text-ink font-medium">
              {form.city || "Not selected"}
            </span>
          </div>
          <div className="flex justify-between py-2.5 border-b border-bd text-sm">
            <span className="text-ink3">{propertyLabel}</span>
            <span className="text-ink font-medium">
              {form.propertySize ? `${form.propertySize} ${propertyUnit}` : "—"}
            </span>
          </div>
          <div className="flex justify-between py-2.5 border-b border-bd text-sm">
            <span className="text-ink3">Confirmation</span>
            <span className="text-ink font-medium">Within 2 hrs</span>
          </div>
          <div className="flex justify-between pt-4 border-t-[1.5px] border-bd2 mt-2">
            <span className="text-xs tracking-widest uppercase text-ink3">
              Estimate
            </span>
            <span className="font-mono text-xl text-accent font-medium">
              {form.servicePrice}
            </span>
          </div>
          <p className="text-[11px] text-ink4 mt-3 leading-relaxed">
            {isAreaPriced
              ? "Final price is calculated based on the area provided. You&apos;ll receive a confirmed quote before service begins."
              : "Final price depends on the number of seats. You&apos;ll receive a confirmed quote before service begins."}
          </p>
        </div>
      </div>
    </>
  );
}
