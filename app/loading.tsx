export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
    </div>
  );
}
