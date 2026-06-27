export default function GalleryLoading() {
  return (
    <div className="min-h-screen pt-[120px] pb-20 px-12 bg-gray-100 max-md:px-5 animate-pulse">
      <div className="text-center mb-12">
        <div className="h-4 w-24 bg-bg2 rounded-full mx-auto mb-4" />
        <div className="h-10 w-96 bg-bg2 rounded-12 mx-auto mb-3 max-md:w-64" />
        <div className="h-5 w-72 bg-bg2 rounded-8 mx-auto" />
      </div>
      <div className="columns-4 gap-3.5 max-md:columns-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i} 
            className="break-inside-avoid mb-3.5 rounded-12 overflow-hidden bg-bg2"
            style={{ height: `${[280, 340, 220, 300, 260, 320, 240, 280][i - 1]}px` }}
          />
        ))}
      </div>
    </div>
  );
}
