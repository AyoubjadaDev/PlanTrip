'use client';

import { useState } from 'react';
import React from 'react';
import { signIn } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FiX, FiMail, FiLock, FiUser, FiLoader, FiArrowLeft } from 'react-icons/fi';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onSwitchMode: () => void;
};

  type ViewType = 'signin' | 'signup' | 'forgot-password' | 'reset-code';

export default function AuthModal({ isOpen, onClose, mode: initialMode, onSwitchMode }: AuthModalProps) {
  const t = useTranslations();
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const [view, setView] = useState<ViewType>(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    newPassword: '',
    resetCode: '',
  });

  // Update view when initialMode (mode prop) changes
  React.useEffect(() => {
    setView(initialMode);
    setError('');
    setSuccess(false);
    setFormData({ name: '', email: '', password: '' });
  }, [initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (view === 'signup') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Registration failed');
        }

        // Auto sign in after registration
        const signInResult = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (signInResult?.ok) {
          // Link anonymous trips is already handled in the register API
          // Show success message if trips were linked
          if (data.linkedTrips > 0) {
            console.log(`Linked ${data.linkedTrips} anonymous trips to new account`);
          }
        }

        onClose();
        // Refresh the page to show linked trips in dashboard
        window.location.reload();
      } else if (view === 'signin') {
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.error) {
          throw new Error('Invalid credentials');
        }

        // Link any anonymous trips after sign in
        if (result?.ok) {
          try {
            const linkRes = await fetch('/api/trips/link-anonymous', {
              method: 'POST',
            });
            const linkData = await linkRes.json();
            if (linkData.linkedTrips > 0) {
              console.log(`Linked ${linkData.linkedTrips} anonymous trips to account`);
            }
          } catch (linkError) {
            console.error('Failed to link anonymous trips:', linkError);
            // Don't throw - this is not critical
          }
        }

        onClose();
        // Refresh the page to show linked trips in dashboard
        window.location.reload();
      } else if (view === 'forgot-password') {
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'An error occurred');
        }

        // Move to code entry view
        setView('reset-code');
        setFormData(prev => ({ ...prev, resetCode: '' }));
      } else if (view === 'reset-code') {
        const response = await fetch('/api/auth/verify-reset-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: formData.email,
            code: formData.resetCode,
            newPassword: formData.newPassword
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'An error occurred');
        }

        setSuccess(true);
        setFormData({ name: '', email: '', password: '', newPassword: '', resetCode: '' });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchMode = () => {
    setError('');
    setSuccess(false);
    setFormData({ name: '', email: '', password: '' });
    setView(view === 'signin' ? 'signup' : 'signin');
  };

  const handleForgotPassword = () => {
    setError('');
    setSuccess(false);
    setFormData({ name: '', email: '', password: '' });
    setView('forgot-password');
  };

  const handleBackToSignIn = () => {
    setError('');
    setSuccess(false);
    setFormData({ name: '', email: '', password: '', newPassword: '', resetCode: '' });
    setView('signin');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          >
            <FiX size={24} />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {view === 'signin' ? t('auth.signIn.title') : view === 'signup' ? t('auth.signUp.title') : view === 'forgot-password' ? 'Reset Password' : 'Enter Reset Code'}
          </h2>
          <p className="text-gray-600 mt-1">
            {view === 'signin' ? t('auth.signIn.subtitle') : view === 'signup' ? t('auth.signUp.subtitle') : view === 'forgot-password' ? 'Enter your email to receive a reset code' : 'Check your email for the 6-digit code'}
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && view === 'forgot-password' && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              Check your email for the reset code
            </div>
          )}

          {success && view === 'reset-code' && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              Password reset successfully! You can now sign in with your new password.
            </div>
          )}

          {/* Form */}
          {!success || view !== 'forgot-password' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {view === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('auth.name')}
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={t('auth.namePlaceholder')}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.email')}
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={t('auth.emailPlaceholder')}
                  />
                </div>
              </div>

              {view !== 'forgot-password' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('auth.password')}
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={view === 'reset-code' ? formData.newPassword : formData.password}
                      onChange={(e) => setFormData({ ...formData, [view === 'reset-code' ? 'newPassword' : 'password']: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={view === 'reset-code' ? 'Enter new password' : t('auth.passwordPlaceholder')}
                      minLength={6}
                    />
                  </div>
                </div>
              )}

              {view === 'reset-code' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reset Code (6 digits)
                  </label>
                  <input
                    type="text"
                    placeholder="000000"
                    required
                    value={formData.resetCode}
                    onChange={(e) => setFormData({ ...formData, resetCode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center text-xl tracking-widest"
                    maxLength={6}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-primary-700 hover:to-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading && <FiLoader className="animate-spin" />}
                {view === 'signin' ? t('auth.signInButton') : view === 'signup' ? t('auth.signUpButton') : view === 'forgot-password' ? 'Send Reset Code' : 'Reset Password'}
              </button>
            </form>
          ) : null}

          {/* Success State for Forgot Password */}
          {success && view === 'reset-code' && (
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Your password has been reset successfully. You can now sign in with your new password.
              </p>
              <button
                onClick={handleBackToSignIn}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center gap-2"
              >
                <FiArrowLeft size={18} />
                Return to Sign In
              </button>
            </div>
          )}

          {/* Switch Mode / Navigation */}
          <div className="mt-6 text-center text-sm">
            {view === 'signin' && !success && (
              <>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-primary-600 hover:text-primary-700 font-semibold block mb-4"
                >
                  Forgot Password?
                </button>
                <span className="text-gray-600">
                  {t('auth.noAccount')}
                </span>
                {' '}
                <button
                  onClick={handleSwitchMode}
                  className="text-primary-600 font-semibold hover:text-primary-700"
                >
                  {t('auth.signUpLink')}
                </button>
              </>
            )}
            {view === 'signup' && !success && (
              <>
                <span className="text-gray-600">
                  {t('auth.haveAccount')}
                </span>
                {' '}
                <button
                  onClick={handleSwitchMode}
                  className="text-primary-600 font-semibold hover:text-primary-700"
                >
                  {t('auth.signInLink')}
                </button>
              </>
            )}
            {view === 'forgot-password' && !success && (
              <button
                type="button"
                onClick={handleBackToSignIn}
                className="text-primary-600 hover:text-primary-700 font-semibold flex items-center justify-center gap-1 mx-auto"
              >
                <FiArrowLeft size={16} />
                Back to Sign In
              </button>
            )}
            {view === 'reset-code' && !success && (
              <button
                type="button"
                onClick={() => setView('forgot-password')}
                className="text-primary-600 hover:text-primary-700 font-semibold flex items-center justify-center gap-1 mx-auto"
              >
                <FiArrowLeft size={16} />
                Back to Email
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
