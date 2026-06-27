const WA_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

export function buildWhatsAppUrl(text: string, phone?: string): string {
  const number = phone ? phone.replace(/\D/g, "") : WA_NUMBER;
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(text: string, phone?: string) {
  window.open(buildWhatsAppUrl(text, phone), "_blank");
}
