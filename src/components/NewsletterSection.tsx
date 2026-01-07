'use client';

import { useState } from 'react';
import { FiMail, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you! Check your email for confirmation.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again later.');
    }

    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white opacity-10"></div>
      
      {/* Floating shapes */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl animate-float-delayed"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-full mb-6 border-4 border-white/30">
          <FiMail className="w-10 h-10 text-white" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">
          Get Free Travel Planning Tips
        </h2>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-medium">
          Join 10,000+ travelers receiving expert destination guides, budget tips, and exclusive travel deals every week.
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-white">
          <div className="flex items-center gap-2">
            <FiCheckCircle className="w-5 h-5 text-green-300" />
            <span className="font-semibold">Weekly Travel Tips</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheckCircle className="w-5 h-5 text-green-300" />
            <span className="font-semibold">Exclusive Deals</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheckCircle className="w-5 h-5 text-green-300" />
            <span className="font-semibold">No Spam, Ever</span>
          </div>
        </div>

        {/* Subscribe Form */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={status === 'loading'}
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 text-lg font-medium disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-black text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : 'Get Free Tips'}
            </button>
          </div>

          {/* Status Messages */}
          {status === 'success' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-300 font-semibold">
              <FiCheckCircle className="w-5 h-5" />
              <span>{message}</span>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-red-300 font-semibold">
              <FiAlertCircle className="w-5 h-5" />
              <span>{message}</span>
            </div>
          )}

          <p className="mt-4 text-sm text-white/70">
            By subscribing, you agree to receive travel tips and occasional promotional emails. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
}
