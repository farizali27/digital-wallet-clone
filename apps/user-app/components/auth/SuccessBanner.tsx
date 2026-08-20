export function SuccessBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2">
      <svg
        className="w-4 h-4 text-emerald-600 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <p className="text-sm text-emerald-700">{message}</p>
    </div>
  );
}