export default function BookLoading() {
  return (
    <div className="min-h-screen bg-bg pt-[120px] pb-20 animate-pulse">
      <div className="max-w-[1000px] mx-auto px-12 max-md:px-5">
        <div className="text-center mb-14">
          <div className="h-4 w-28 bg-bg3 rounded-full mx-auto mb-4" />
          <div className="h-10 w-72 bg-bg3 rounded-12 mx-auto mb-3" />
          <div className="h-5 w-80 bg-bg3 rounded-8 mx-auto" />
        </div>
        <div className="flex items-center justify-center mb-14 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="size-9 bg-bg3 rounded-full" />
              <div className="h-3 w-16 bg-bg3 rounded-8" />
            </div>
          ))}
        </div>
        <div className="flex gap-8 items-start max-md:flex-col">
          <div className="flex-1 space-y-5">
            <div className="h-8 w-48 bg-bg3 rounded-12" />
            <div className="grid grid-cols-4 gap-3.5 max-md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-28 bg-bg3 rounded-12" />
              ))}
            </div>
          </div>
          <div className="flex-[0_0_300px] bg-bg2 rounded-16 p-7 border border-bd max-md:flex-none max-md:w-full">
            <div className="h-5 w-32 bg-bg3 rounded-8 mb-5" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-full bg-bg3 rounded-8" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
