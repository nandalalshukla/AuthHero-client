export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a]">
      <div className="relative flex flex-col items-center gap-6">
        <div className="absolute inset-0 bg-[#3ECF8E]/20 blur-3xl rounded-full" />
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="absolute h-full w-full animate-[spin_3s_linear_infinite] rounded-full border border-dashed border-[#3ECF8E]/40" />
          <div className="absolute h-8 w-8 animate-[spin_2s_linear_infinite_reverse] rounded-full border-2 border-transparent border-t-[#3ECF8E] border-l-[#3ECF8E]" />
          <div className="h-4 w-4 rounded-full bg-[#3ECF8E]/80 shadow-[0_0_15px_rgba(62,207,142,0.8)] animate-pulse" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[13px] font-semibold tracking-widest text-[#3ECF8E] uppercase uppercase drop-shadow-[0_0_8px_rgba(62,207,142,0.5)]">
            Loading AuthHero
          </span>
          <span className="text-[11px] font-mono text-zinc-500 mt-1">
            Initializing secure environment...
          </span>
        </div>
      </div>
    </div>
  );
}
