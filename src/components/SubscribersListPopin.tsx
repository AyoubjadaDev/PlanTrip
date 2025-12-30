import React, { useEffect, useState } from 'react';

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}


export function SubscribersListPopin({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchSubscribers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/subscribers');
      const data = await res.json();
      setSubscribers(data.subscribers || []);
    } catch {
      setError('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchSubscribers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Export subscribers as CSV
  const exportCSV = () => {
    if (!subscribers.length) return;
    const header = ['Email', 'Subscribed At'];
    const rows = subscribers.map(s => [s.email, new Date(s.subscribedAt).toLocaleString()]);
    const csv = [header, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>{trigger}</span>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✕</button>
            <h3 className="text-lg font-bold mb-4">All Newsletter Subscribers (Report)</h3>
            <div className="flex gap-2 mb-4">
              <button onClick={fetchSubscribers} className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs">🔄 Refresh</button>
              <button onClick={exportCSV} className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-xs">⬇️ Export CSV</button>
            </div>
            {loading ? (
              <div className="text-center py-8 text-gray-500">Loading...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <ul className="divide-y divide-gray-200 max-h-72 overflow-y-auto">
                {subscribers.length === 0 && <li className="py-2 text-gray-400 text-center">No subscribers yet.</li>}
                {subscribers.map((s) => (
                  <li key={s.id} className="py-2 flex flex-col">
                    <span className="font-mono text-xs text-gray-700">{s.email}</span>
                    <span className="text-xs text-gray-400">{new Date(s.subscribedAt).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
