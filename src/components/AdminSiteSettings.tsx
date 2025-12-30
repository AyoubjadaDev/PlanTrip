import React, { useEffect, useState } from 'react';

export default function AdminSiteSettings() {
  const [settings, setSettings] = useState({
    googleAnalyticsId: '',
    googleAdsenseCode: '',
    googleSearchConsoleMeta: '',
  });
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/site-settings')
      .then(res => res.json())
      .then(data => {
        if (data.settings) {
          setSettings({
            googleAnalyticsId: data.settings.googleAnalyticsId || '',
            googleAdsenseCode: data.settings.googleAdsenseCode || '',
            googleSearchConsoleMeta: data.settings.googleSearchConsoleMeta || '',
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await fetch('/api/admin/site-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setStatus('Settings updated successfully!');
      } else {
        setStatus('Failed to update settings.');
      }
    } catch {
      setStatus('Network error.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">Google Integrations Settings</h2>
      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Google Analytics Measurement ID</label>
            <input
              type="text"
              name="googleAnalyticsId"
              value={settings.googleAnalyticsId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="G-XXXXXXXXXX"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Google AdSense Code (script)</label>
            <textarea
              name="googleAdsenseCode"
              value={settings.googleAdsenseCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              rows={3}
              placeholder="Paste AdSense script here"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Google Search Console Meta Tag</label>
            <input
              type="text"
              name="googleSearchConsoleMeta"
              value={settings.googleSearchConsoleMeta}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="<meta name=...>"
            />
          </div>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded">Save Settings</button>
          {status && <div className="mt-2 text-sm text-green-700">{status}</div>}
        </form>
      )}
    </div>
  );
}
