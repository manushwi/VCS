const WA_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(text: string) {
  window.open(buildWhatsAppUrl(text), "_blank");
}
