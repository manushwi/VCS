import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({ pageSlug: "contact" });
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-[120px] pb-20 px-12 bg-bg max-md:px-5">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-16">
          <div className="section-eyebrow flex justify-center">Get in Touch</div>
          <h1 className="section-title">
            Let&apos;s <em>talk.</em>
          </h1>
          <p className="section-sub mx-auto">
            Have a question, need a quote, or want to discuss a project? We are
            here to help.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-16 max-md:grid-cols-1">
          <div className="bg-bg2 rounded-16 p-8 border border-bd">
            <div className="text-xl mb-3">📞</div>
            <h3 className="font-serif text-xl text-ink mb-2 font-normal">Phone</h3>
            <p className="text-ink3 text-sm">+91 98765 43210</p>
            <p className="text-ink4 text-xs mt-2">Mon–Sat, 8 AM – 8 PM</p>
          </div>
          <div className="bg-bg2 rounded-16 p-8 border border-bd">
            <div className="text-xl mb-3">✉</div>
            <h3 className="font-serif text-xl text-ink mb-2 font-normal">Email</h3>
            <p className="text-ink3 text-sm">hello@vartika.in</p>
            <p className="text-ink4 text-xs mt-2">We reply within 2 hours</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-ink3 text-sm mb-8">
            Prefer WhatsApp? Message us directly.
          </p>
          <Link
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"}`}
            target="_blank"
            className="btn inline-flex items-center gap-2 bg-[#25D366] text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-[#20c059] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(37,211,102,0.3)] transition-all"
          >
            Chat on WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}
