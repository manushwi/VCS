export default function ServiceLoading() {
  return (
    <div className="min-h-screen pt-[120px] pb-20 px-12 bg-bg max-md:px-5 animate-pulse">
      <div className="max-w-[800px] mx-auto">
        <div className="h-4 w-24 bg-bg3 rounded-8 mb-8" />
        <div className="h-5 w-32 bg-bg3 rounded-full mb-2" />
        <div className="h-10 w-96 bg-bg3 rounded-12 mb-2 max-md:w-full" />
        <div className="h-5 w-64 bg-bg3 rounded-8 mb-8" />
        <div className="aspect-[16/9] bg-bg3 rounded-24 mb-10" />
        <div className="space-y-3 mb-8">
          <div className="h-4 w-full bg-bg3 rounded-8" />
          <div className="h-4 w-5/6 bg-bg3 rounded-8" />
          <div className="h-4 w-4/6 bg-bg3 rounded-8" />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="size-5 bg-bg3 rounded-full shrink-0 mt-0.5" />
              <div className="h-4 flex-1 bg-bg3 rounded-8" />
            </div>
          ))}
        </div>
        <div className="space-y-3 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="size-7 bg-bg3 rounded-full shrink-0" />
              <div className="h-4 flex-1 bg-bg3 rounded-8" />
            </div>
          ))}
        </div>
        <div className="h-14 w-48 bg-bg3 rounded-full" />
      </div>
    </div>
  );
}
