import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const WA_NUMBER = "919876543210";

interface Payload {
  name: string;
  service?: string;
  date?: string;
  time?: string;
  template: "booking_received" | "appointment_confirmed" | "request_review";
}

const TEMPLATES: Record<string, (p: Payload) => string> = {
  booking_received: (p) =>
    `Hi ${p.name}, thank you for booking ${p.service || "a service"} with Vartika Cleaning Solutions! We've received your request and will confirm within 2 hours.`,

  appointment_confirmed: (p) =>
    `Hi ${p.name}, your ${p.service || "service"} is confirmed for ${p.date || "your selected date"} at ${p.time || "your selected time"}. Our team will arrive on time. Reply OK to confirm.`,

  request_review: (p) =>
    `Hi ${p.name}, we hope your space feels wonderful! If you're happy with Vartika's service, we'd love a 5-star review. Thank you for choosing us!`,
};

serve(async (req: Request) => {
  try {
    const payload: Payload = await req.json();
    const text = TEMPLATES[payload.template]?.(payload);
    if (!text) {
      return new Response(JSON.stringify({ error: "Invalid template" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

    return new Response(
      JSON.stringify({ wa_url: waUrl, message: text }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
