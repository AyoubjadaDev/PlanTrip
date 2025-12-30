'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { FiMenu, FiX, FiGrid, FiInfo, FiBookOpen, FiUser, FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi';
import AuthModal from './AuthModal';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' }, // Morocco as a common Arabic flag
];

export default function Header() {
  const t = useTranslations('nav');
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo (icon + text) */}
          <Link href={`/${currentLocale}`} className="flex items-center space-x-2">
            <img src="/logo_travel.png" alt="PlanYourNextTravel Logo" className="h-10 w-10" />
            <span className="text-xl font-extrabold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm animate-gradient-x">
              PlanMyNextTravel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href={`/${currentLocale}#features`} className="text-gray-700 hover:text-primary-600">
              {t('features')}
            </Link>
            <Link href={`/${currentLocale}#how-it-works`} className="text-gray-700 hover:text-primary-600">
              {t('howItWorks')}
            </Link>
            <Link href={`/${currentLocale}/blog`} className="text-gray-700 hover:text-primary-600">
              {t('blog')}
            </Link>

            {session ? (
              <>
                <Link href={`/${currentLocale}/dashboard`} className="text-gray-700 hover:text-primary-600">
                  {t('dashboard')}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-primary-600"
                >
                  {t('signOut')}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal('signin')}
                  className="text-gray-700 hover:text-primary-600 font-medium transition"
                >
                  {t('signIn')}
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="bg-gradient-to-r from-primary-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:from-primary-700 hover:to-blue-700 font-semibold transition shadow-md hover:shadow-lg"
                >
                  {t('signUp')}
                </button>
              </>
            )}

            {/* Language Selector (flags only, no globe) */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600"
                aria-label="Select language"
              >
                <span className="text-lg">
                  {languages.find(l => l.code === currentLocale)?.flag || '🏳️'}
                </span>
                <span className="text-sm">{currentLocale.toUpperCase()}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        switchLanguage(lang.code);
                        setLangMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100 ${
                        currentLocale === lang.code ? 'bg-primary-50 text-primary-600' : ''
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex flex-col md:hidden transition-all bg-gradient-to-r from-gray-50 to-white">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 shadow hover:bg-gray-100 border border-gray-200"
              aria-label="Close menu"
            >
              <FiX size={28} className="text-gray-700" />
            </button>
            <nav className="flex flex-col gap-2 mt-20 px-4 w-full">
              <Link href={`/${currentLocale}#features`} className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium text-gray-700 hover:bg-gray-100 transition group w-full" onClick={() => setMobileMenuOpen(false)}>
                <FiGrid className="text-xl" />
                <span>{t('features')}</span>
              </Link>
              <Link href={`/${currentLocale}#how-it-works`} className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium text-gray-700 hover:bg-gray-100 transition group w-full" onClick={() => setMobileMenuOpen(false)}>
                <FiInfo className="text-xl" />
                <span>{t('howItWorks')}</span>
              </Link>
              <Link href={`/${currentLocale}/blog`} className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium text-gray-700 hover:bg-gray-100 transition group w-full" onClick={() => setMobileMenuOpen(false)}>
                <FiBookOpen className="text-xl" />
                <span>{t('blog')}</span>
              </Link>
              {session ? (
                <>
                  <Link href={`/${currentLocale}/dashboard`} className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium text-gray-700 hover:bg-gray-100 transition group w-full" onClick={() => setMobileMenuOpen(false)}>
                    <FiUser className="text-xl" />
                    <span>{t('dashboard')}</span>
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium text-gray-700 hover:bg-gray-100 transition group w-full"
                  >
                    <FiLogOut className="text-xl" />
                    <span>{t('signOut')}</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      openAuthModal('signin');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium text-gray-700 hover:bg-gray-100 transition group w-full"
                  >
                    <FiLogIn className="text-xl" />
                    <span>{t('signIn')}</span>
                  </button>
                  <button
                    onClick={() => {
                      openAuthModal('signup');
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-blue-600 text-white font-semibold shadow-md hover:from-primary-700 hover:to-blue-700 hover:scale-105 transition mt-2 w-full"
                  >
                    <FiUserPlus className="text-xl" />
                    <span>{t('signUp')}</span>
                  </button>
                </>
              )}
            </nav>
            <div className="flex flex-col items-center w-full gap-2 px-4 mt-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    switchLanguage(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full justify-center text-lg px-4 py-2 rounded-xl hover:bg-gray-100 transition ${
                    currentLocale === lang.code ? 'bg-primary-50 text-primary-600' : ''
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
      />
    </header>
  );
}
