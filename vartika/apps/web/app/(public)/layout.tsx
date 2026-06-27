import { createServerSupabase } from "@/lib/supabase/server";
import { getJsonLd, SITE_NAME, SITE_URL } from "@/lib/seo";
import CustomCursor from "@/components/public/shared/CustomCursor";
import Loader from "@/components/public/shared/Loader";
import Lightbox from "@/components/public/shared/Lightbox";
import WhatsAppFloatingBtn from "@/components/public/shared/WhatsAppFloatingBtn";
import Navbar from "@/components/public/layout/Navbar";
import Footer from "@/components/public/layout/Footer";

async function GlobalJsonLd() {
  try {
    const supabase = await createServerSupabase();
    const schemas = await getJsonLd(supabase);
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
    );
  } catch {
    return null;
  }
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalJsonLd />
      <CustomCursor />
      <Loader />
      <Navbar />
      {children}
      <Footer />
      <Lightbox />
      <WhatsAppFloatingBtn />
    </>
  );
}
