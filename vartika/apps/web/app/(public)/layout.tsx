import CustomCursor from "@/components/public/shared/CustomCursor";
import Loader from "@/components/public/shared/Loader";
import Lightbox from "@/components/public/shared/Lightbox";
import WhatsAppFloatingBtn from "@/components/public/shared/WhatsAppFloatingBtn";
import Navbar from "@/components/public/layout/Navbar";
import Footer from "@/components/public/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
