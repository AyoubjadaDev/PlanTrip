'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { FiMenu, FiX, FiGrid, FiInfo, FiBookOpen, FiUser, FiLogIn, FiLogOut, FiUserPlus, FiHome, FiSettings, FiMapPin } from 'react-icons/fi';
import AuthModal from './AuthModal';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
];

export default function Sidebar() {
  const t = useTranslations('nav');
  const { data: session } = useSession();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const currentLocale = pathname.split('/')[1] || 'en';

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const switchLanguage = (locale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(en|fr|ar)/, '');
    window.location.href = `/${locale}${pathWithoutLocale}`;
  };

  const isActive = (path: string) => {
    return pathname === `/${currentLocale}${path}` || pathname.startsWith(`/${currentLocale}${path}/`);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href={`/${currentLocale}`} className="flex items-center space-x-2">
            <img src="/logo_Travel.png" alt="Logo" className="h-8 w-8" />
            <span className="text-lg font-extrabold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              PlanMyNextTravel
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Toggle menu"
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-xl z-50 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-64`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <Link href={`/${currentLocale}`} className="flex items-center space-x-2" onClick={() => setSidebarOpen(false)}>
            <img src="/logo_Travel.png" alt="Logo" className="h-10 w-10" />
            <span className="text-lg font-extrabold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              PlanMyNextTravel
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-700 p-1"
            aria-label="Close sidebar"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            <Link
              href={`/${currentLocale}`}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiHome className="text-lg flex-shrink-0" />
              <span>Home</span>
            </Link>

            <Link
              href={`/${currentLocale}/destinations`}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                isActive('/destinations')
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiMapPin className="text-lg flex-shrink-0" />
              <span>Destinations</span>
            </Link>

            <Link
              href={`/${currentLocale}/blog`}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                isActive('/blog')
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FiBookOpen className="text-lg flex-shrink-0" />
              <span>{t('blog')}</span>
            </Link>

            <Link
              href={`/${currentLocale}#features`}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              <FiGrid className="text-lg flex-shrink-0" />
              <span>{t('features')}</span>
            </Link>

            <Link
              href={`/${currentLocale}#how-it-works`}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              <FiInfo className="text-lg flex-shrink-0" />
              <span>{t('howItWorks')}</span>
            </Link>

            {session && (
              <>
                <Link
                  href={`/${currentLocale}/dashboard`}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                    isActive('/dashboard')
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FiUser className="text-lg flex-shrink-0" />
                  <span>{t('dashboard')}</span>
                </Link>

                {session.user?.isAdmin && (
                  <Link
                    href={`/${currentLocale}/admin`}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                      isActive('/admin')
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <FiSettings className="text-lg flex-shrink-0" />
                    <span>Admin</span>
                  </Link>
                )}
              </>
            )}
          </div>
        </nav>

        {/* User Section */}
        <div className="border-t border-gray-200 p-3">
          {session ? (
            <div className="space-y-2">
              <div className="px-4 py-2 text-sm">
                <p className="text-gray-500 text-xs mb-1">Signed in as</p>
                <p className="font-medium text-gray-900 truncate">{session.user?.email}</p>
              </div>
              <button
                onClick={() => {
                  signOut();
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition w-full"
              >
                <FiLogOut className="text-lg flex-shrink-0" />
                <span>{t('signOut')}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => {
                  openAuthModal('signin');
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition w-full"
              >
                <FiLogIn className="text-lg flex-shrink-0" />
                <span>{t('signIn')}</span>
              </button>
              <button
                onClick={() => {
                  openAuthModal('signup');
                  setSidebarOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-blue-600 text-white font-semibold shadow-md hover:from-primary-700 hover:to-blue-700 transition w-full"
              >
                <FiUserPlus className="text-lg flex-shrink-0" />
                <span>{t('signUp')}</span>
              </button>
            </div>
          )}

          {/* Language Selector */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="px-4 text-xs text-gray-500 mb-2">Language</p>
            <div className="space-y-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    switchLanguage(lang.code);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg text-sm transition ${
                    currentLocale === lang.code
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
      />
    </>
  );
}
