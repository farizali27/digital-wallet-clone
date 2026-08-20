export function FormError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2">
      <p className="text-sm text-red-600">{message}</p>
    </div>
  );
}