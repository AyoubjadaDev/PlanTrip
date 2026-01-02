'use client';

import { FiShare2, FiTwitter, FiFacebook, FiLinkedin, FiLink, FiCheck } from 'react-icons/fi';
import { useState } from 'react';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

export default function SocialShare({ url, title, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <div className="relative">
      {/* Desktop: Always visible */}
      <div className="hidden md:flex items-center gap-3">
        <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
          <FiShare2 className="text-orange-600" />
          Share:
        </span>
        <button
          onClick={() => handleShare('twitter')}
          className="p-2 rounded-full bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          aria-label="Share on Twitter"
        >
          <FiTwitter size={18} />
        </button>
        <button
          onClick={() => handleShare('facebook')}
          className="p-2 rounded-full bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors"
          aria-label="Share on Facebook"
        >
          <FiFacebook size={18} />
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="p-2 rounded-full bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
          aria-label="Share on LinkedIn"
        >
          <FiLinkedin size={18} />
        </button>
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-full bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
          aria-label="Copy link"
        >
          {copied ? <FiCheck size={18} className="text-green-600" /> : <FiLink size={18} />}
        </button>
      </div>

      {/* Mobile: Dropdown */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all"
        >
          <FiShare2 size={18} />
          Share
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Share menu */}
            <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl p-4 z-50 min-w-[200px] border border-gray-200">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    handleShare('twitter');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiTwitter size={20} />
                  <span className="font-medium">Twitter</span>
                </button>
                <button
                  onClick={() => {
                    handleShare('facebook');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-700 transition-colors"
                >
                  <FiFacebook size={20} />
                  <span className="font-medium">Facebook</span>
                </button>
                <button
                  onClick={() => {
                    handleShare('linkedin');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiLinkedin size={20} />
                  <span className="font-medium">LinkedIn</span>
                </button>
                <button
                  onClick={() => {
                    copyToClipboard();
                    setTimeout(() => setIsOpen(false), 1500);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
                >
                  {copied ? (
                    <>
                      <FiCheck size={20} className="text-green-600" />
                      <span className="font-medium text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiLink size={20} />
                      <span className="font-medium">Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
