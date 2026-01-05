'use client';

import { FiShare2, FiLink, FiCheck, FiMail } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaInstagram, FaTiktok } from 'react-icons/fa';
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
    instagram: `https://www.instagram.com/`, // Instagram doesn't have direct share URL
    tiktok: `https://www.tiktok.com/`, // TikTok doesn't have direct share URL
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
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
    if (platform === 'email') {
      window.location.href = shareLinks[platform];
    } else if (platform === 'instagram' || platform === 'tiktok') {
      // For Instagram and TikTok, copy link and inform user
      copyToClipboard();
      alert(`Link copied! Open ${platform === 'instagram' ? 'Instagram' : 'TikTok'} and paste it in your message.`);
    } else {
      window.open(shareLinks[platform], '_blank', 'noopener,noreferrer,width=600,height=400');
    }
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
          className="p-2 rounded-full bg-gray-100 hover:bg-[#1DA1F2] hover:text-white text-[#1DA1F2] transition-all"
          aria-label="Share on Twitter"
        >
          <FaTwitter size={18} />
        </button>
        <button
          onClick={() => handleShare('facebook')}
          className="p-2 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white text-[#1877F2] transition-all"
          aria-label="Share on Facebook"
        >
          <FaFacebook size={18} />
        </button>
        <button
          onClick={() => handleShare('linkedin')}
          className="p-2 rounded-full bg-gray-100 hover:bg-[#0A66C2] hover:text-white text-[#0A66C2] transition-all"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedin size={18} />
        </button>
        <button
          onClick={() => handleShare('whatsapp')}
          className="p-2 rounded-full bg-gray-100 hover:bg-[#25D366] hover:text-white text-[#25D366] transition-all"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp size={18} />
        </button>
        <button
          onClick={() => handleShare('instagram')}
          className="p-2 rounded-full bg-gray-100 hover:bg-[#E4405F] hover:text-white text-[#E4405F] transition-all"
          aria-label="Share on Instagram"
        >
          <FaInstagram size={18} />
        </button>
        <button
          onClick={() => handleShare('tiktok')}
          className="p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white text-black transition-all"
          aria-label="Share on TikTok"
        >
          <FaTiktok size={18} />
        </button>
        <button
          onClick={() => handleShare('email')}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-700 hover:text-white text-gray-700 transition-all"
          aria-label="Share via Email"
        >
          <FiMail size={18} />
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
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-[#1DA1F2] transition-colors"
                >
                  <FaTwitter size={20} />
                  <span className="font-medium text-gray-700">Twitter</span>
                </button>
                <button
                  onClick={() => {
                    handleShare('facebook');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-[#1877F2] transition-colors"
                >
                  <FaFacebook size={20} />
                  <span className="font-medium text-gray-700">Facebook</span>
                </button>
                <button
                  onClick={() => {
                    handleShare('linkedin');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-[#0A66C2] transition-colors"
                >
                  <FaLinkedin size={20} />
                  <span className="font-medium text-gray-700">LinkedIn</span>
                </button>
                <button
                  onClick={() => {
                    handleShare('whatsapp');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 text-[#25D366] transition-colors"
                >
                  <FaWhatsapp size={20} />
                  <span className="font-medium text-gray-700">WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    handleShare('instagram');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-pink-50 text-[#E4405F] transition-colors"
                >
                  <FaInstagram size={20} />
                  <span className="font-medium text-gray-700">Instagram</span>
                </button>
                <button
                  onClick={() => {
                    handleShare('tiktok');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 text-black transition-colors"
                >
                  <FaTiktok size={20} />
                  <span className="font-medium text-gray-700">TikTok</span>
                </button>
                <button
                  onClick={() => {
                    handleShare('email');
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors"
                >
                  <FiMail size={20} />
                  <span className="font-medium">Email</span>
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
