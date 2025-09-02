export default function Loading() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="h-8 w-48 rounded-md bg-muted animate-pulse" />
      <div className="h-4 w-64 rounded-md bg-muted animate-pulse" />
      <div className="mt-4 flex flex-col gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={`brand-loading-${i}`} className="h-16 rounded-md bg-muted animate-pulse" />
        ))}
      </div>
    </div>
  );
}
