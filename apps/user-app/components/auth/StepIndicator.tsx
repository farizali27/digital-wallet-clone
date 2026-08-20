interface StepIndicatorProps {
  totalSteps: number;
  currentIndex: number;
}

export function StepIndicator({ totalSteps, currentIndex }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 w-8 rounded-full transition-all ${
            i === currentIndex
              ? "bg-slate-900"
              : i < currentIndex
              ? "bg-slate-400"
              : "bg-slate-200"
          }`}
        />
      ))}
    </div>
  );
}