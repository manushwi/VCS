export default function AdminLoading() {
  return (
    <div className="animate-pulse p-7">
      <div className="h-6 w-48 bg-white/5 rounded-8 mb-5" />
      <div className="bg-[#161714] border border-white/6 rounded-12 p-8">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 w-full bg-white/5 rounded-8" />
          ))}
        </div>
      </div>
    </div>
  );
}
