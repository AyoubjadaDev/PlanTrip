import React, { useEffect, useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPinterest, FaTiktok } from 'react-icons/fa';

export default function AdminSiteSettings() {
  const [settings, setSettings] = useState({
    googleAnalyticsId: '',
    googleAdsenseCode: '',
    googleSearchConsoleMeta: '',
    adsTxt: '',
    headerAdCode: '',
    sidebarAdCode: '',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
    pinterestUrl: '',
    tiktokUrl: '',
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
            adsTxt: data.settings.adsTxt || '',
            headerAdCode: data.settings.headerAdCode || '',
            sidebarAdCode: data.settings.sidebarAdCode || '',
            facebookUrl: data.settings.facebookUrl || '',
            twitterUrl: data.settings.twitterUrl || '',
            instagramUrl: data.settings.instagramUrl || '',
            linkedinUrl: data.settings.linkedinUrl || '',
            youtubeUrl: data.settings.youtubeUrl || '',
            pinterestUrl: data.settings.pinterestUrl || '',
            tiktokUrl: data.settings.tiktokUrl || '',
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
          <div>
            <label className="block font-medium mb-2">Ads.txt Content</label>
            <textarea
              name="adsTxt"
              value={settings.adsTxt}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded font-mono text-sm"
              rows={6}
              placeholder="google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter your ads.txt content for Google AdSense verification. This will be served at /ads.txt
            </p>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Ad Display Codes</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block font-medium mb-2">Header Ad Code</label>
                <textarea
                  name="headerAdCode"
                  value={settings.headerAdCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded font-mono text-sm"
                  rows={5}
                  placeholder="<ins class='adsbygoogle' ...></ins><script>...</script>"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Ad unit to display in the header section (below navigation)
                </p>
              </div>
              
              <div>
                <label className="block font-medium mb-2">Sidebar Ad Code</label>
                <textarea
                  name="sidebarAdCode"
                  value={settings.sidebarAdCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded font-mono text-sm"
                  rows={5}
                  placeholder="<ins class='adsbygoogle' ...></ins><script>...</script>"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Ad unit to display in the sidebar or content area
                </p>
              </div>
            </div>
          </div>
          
          {/* Social Media Links Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span>Social Media Links</span>
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              These links will appear as social media icons in the footer of your website
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-2 flex items-center gap-2">
                  <FaFacebook className="text-blue-600" />
                  Facebook URL
                </label>
                <input
                  type="url"
                  name="facebookUrl"
                  value={settings.facebookUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              
              <div>
                <label className="block font-medium mb-2 flex items-center gap-2">
                  <FaTwitter className="text-sky-500" />
                  Twitter/X URL
                </label>
                <input
                  type="url"
                  name="twitterUrl"
                  value={settings.twitterUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>
              
              <div>
                <label className="block font-medium mb-2 flex items-center gap-2">
                  <FaInstagram className="text-pink-600" />
                  Instagram URL
                </label>
                <input
                  type="url"
                  name="instagramUrl"
                  value={settings.instagramUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
              
              <div>
                <label className="block font-medium mb-2 flex items-center gap-2">
                  <FaLinkedin className="text-blue-700" />
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="linkedinUrl"
                  value={settings.linkedinUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
              
              <div>
                <label className="block font-medium mb-2 flex items-center gap-2">
                  <FaYoutube className="text-red-600" />
                  YouTube URL
                </label>
                <input
                  type="url"
                  name="youtubeUrl"
                  value={settings.youtubeUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="https://youtube.com/@yourchannel"
                />
              </div>
              
              <div>
                <label className="block font-medium mb-2 flex items-center gap-2">
                  <FaPinterest className="text-red-700" />
                  Pinterest URL
                </label>
                <input
                  type="url"
                  name="pinterestUrl"
                  value={settings.pinterestUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="https://pinterest.com/yourprofile"
                />
              </div>
              
              <div>
                <label className="block font-medium mb-2 flex items-center gap-2">
                  <FaTiktok className="text-black" />
                  TikTok URL
                </label>
                <input
                  type="url"
                  name="tiktokUrl"
                  value={settings.tiktokUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  placeholder="https://tiktok.com/@yourusername"
                />
              </div>
            </div>
          </div>
          
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded">Save Settings</button>
          {status && <div className="mt-2 text-sm text-green-700">{status}</div>}
        </form>
      )}
    </div>
  );
}
