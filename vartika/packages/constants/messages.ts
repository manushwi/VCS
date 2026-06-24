export const WA_TEMPLATES = {
  booking_received: (name: string, service: string) =>
    `Hi ${name}, thank you for booking ${service} with Vartika Cleaning Solutions! We've received your request and will confirm within 2 hours.`,
  
  appointment_confirmed: (name: string, service: string, date: string, time: string) =>
    `Hi ${name}, your ${service} is confirmed for ${date} at ${time}. Our team will arrive on time. Reply OK to confirm.`,
  
  request_review: (name: string) =>
    `Hi ${name}, we hope your space feels wonderful! If you're happy with Vartika's service, we'd love a 5-star review. Thank you for choosing us!`,
} as const;

export const EMAIL_SUBJECTS = {
  booking_confirmed: "Vartika — Booking Confirmed",
  new_booking_admin: "New Booking Received — Vartika",
} as const;
