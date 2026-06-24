import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-12 pt-[68px] max-md:px-5">
      <div className="text-center max-w-[600px]">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="section-title">
          Thank you for <em>booking!</em>
        </h1>
        <p className="section-sub mx-auto mb-4">
          Your request has been received. Our team will contact you within 2
          hours via WhatsApp to confirm your appointment and provide a final
          quote.
        </p>
        <p className="text-sm text-ink4 mb-10">
          No payment is required at this stage.
        </p>
        <Link
          href="/"
          className="btn inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide shadow-[0_4px_20px_rgba(61,89,72,0.2)] hover:bg-accent2 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(61,89,72,0.3)] transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
