interface SubmitButtonProps {
  isPending: boolean;
  pendingLabel: string;
  children: string;
}

export function SubmitButton({ isPending, pendingLabel, children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="w-full rounded-lg bg-slate-900 text-white font-medium py-2.5 hover:bg-slate-800 active:bg-slate-950 disabled:opacity-60 disabled:cursor-not-allowed transition"
    >
      {isPending ? pendingLabel : children}
    </button>
  );
}