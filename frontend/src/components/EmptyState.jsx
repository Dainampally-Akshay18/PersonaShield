function EmptyState({ message = 'Not enough information detected' }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-4 py-6 text-center text-sm text-slate-400">
      {message}
    </div>
  );
}

export default EmptyState;
