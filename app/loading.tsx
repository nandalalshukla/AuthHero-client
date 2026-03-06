export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1C1C1C]">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#3ECF8E]/20 border-t-[#3ECF8E]" />
        <span className="text-sm text-zinc-500">Loading...</span>
      </div>
    </div>
  );
}
