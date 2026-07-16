export const today = () => new Date().toISOString().split('T')[0];

export function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

export function statusClass(status = '') {
  const s = status.toUpperCase();
  return (
    { APPLIED:'badge-blue', SHORTLISTED:'badge-yellow', SELECTED:'badge-green',
      REJECTED:'badge-red',  PLACED:'badge-green',       UNPLACED:'badge-red' }[s]
    || 'badge-slate'
  );
}
