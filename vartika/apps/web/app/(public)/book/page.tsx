import BookingForm from "@/components/public/booking/BookingForm";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <div className="min-h-screen bg-bg pt-[120px] pb-20">
      <div className="max-w-[1000px] mx-auto px-12 max-md:px-5">
        <div className="text-center mb-14">
          <div className="section-eyebrow flex justify-center">Book a Service</div>
          <h1 className="section-title">
            Let&apos;s get <em>started.</em>
          </h1>
          <p className="section-sub mx-auto">
            Fill in a few details. We&apos;ll confirm within 2 hours.
          </p>
        </div>
        <BookingForm initialService={service} />
      </div>
    </div>
  );
}
