'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaPinterest, FaTiktok } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Footer() {
  const t = useTranslations('footer');
  const params = useParams();
  const locale = params.locale as string;
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    pinterest: '',
    tiktok: '',
  });

  useEffect(() => {
    // Fetch social media links from settings
    fetch('/api/settings/social')
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) {
          setSocialLinks(data.settings);
        }
      })
      .catch(() => {
        // Silently fail - social icons just won't be clickable
      });
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href={`/${locale}`} className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">✈️</span>
              <span className="text-xl font-bold">PlanMyNextTravel</span>
            </Link>
            <p className="text-gray-400 mb-4">{t('tagline')}</p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all"
                  aria-label="Facebook"
                >
                  <FaFacebook size={20} />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-all"
                  aria-label="Twitter"
                >
                  <FaTwitter size={20} />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all"
                  aria-label="YouTube"
                >
                  <FaYoutube size={20} />
                </a>
              )}
              {socialLinks.pinterest && (
                <a
                  href={socialLinks.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-red-700 rounded-full flex items-center justify-center transition-all"
                  aria-label="Pinterest"
                >
                  <FaPinterest size={20} />
                </a>
              )}
              {socialLinks.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-black rounded-full flex items-center justify-center transition-all"
                  aria-label="TikTok"
                >
                  <FaTiktok size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">{t('company')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/about`} className="text-gray-400 hover:text-white">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-400 hover:text-white">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/destinations`} className="text-gray-400 hover:text-white">
                  {t('destinations')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="text-gray-400 hover:text-white">
                  {t('blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">{t('legal')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/affiliate-disclosure`} className="text-gray-400 hover:text-white">
                  {t('affiliateDisclosure')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} PlanMyNextTravel. {t('rights')}</p>
        </div>
      </div>
    </footer>
  );
}
