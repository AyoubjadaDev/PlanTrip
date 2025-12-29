import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TripGeneratorWizard from '@/components/TripGeneratorWizard';
import Link from 'next/link';
import Image from 'next/image';
import { FiZap, FiGlobe, FiClock, FiDollarSign, FiCheckCircle, FiStar, FiArrowRight, FiTrendingUp, FiAward, FiMapPin } from 'react-icons/fi';
import { getBlogPosts } from '@/data/blog';

export const dynamic = "force-dynamic";

// Generate metadata for SEO (2025 best practices)
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5200';
  const pageUrl = `${baseUrl}/${params.locale}`;

  const titles: Record<string, string> = {
    en: 'AI Trip Planner - Plan Your Perfect Trip with AI | Free Itinerary Generator',
    fr: 'Planificateur de Voyage IA - Planifiez Votre Voyage Parfait | Générateur d\'Itinéraire Gratuit',
    ar: 'مخطط رحلات بالذكاء الاصطناعي - خطط لرحلتك المثالية | مولد برنامج رحلات مجاني',
  };

  const descriptions: Record<string, string> = {
    en: 'Create personalized day-by-day travel itineraries instantly with AI. Get budget estimates, activities, and recommendations for your dream vacation. Free, multilingual, and powered by advanced AI.',
    fr: 'Créez des itinéraires de voyage personnalisés jour par jour instantanément avec l\'IA. Obtenez des estimations budgétaires, des activités et des recommandations pour vos vacances de rêve. Gratuit, multilingue et alimenté par une IA avancée.',
    ar: 'أنشئ برامج رحلات مخصصة يومًا بعد يوم على الفور باستخدام الذكاء الاصطناعي. احصل على تقديرات الميزانية والأنشطة والتوصيات لعطلة أحلامك. مجاني ومتعدد اللغات ومدعوم بالذكاء الاصطناعي المتقدم.',
  };


  return {
    title: titles[params.locale] || titles.en,
    description: descriptions[params.locale] || descriptions.en,
    keywords: 'AI trip planner, travel itinerary generator, vacation planner, travel planning, AI travel assistant, budget travel, itinerary maker, travel recommendations, personalized travel, free trip planner',
    authors: [{ name: 'PlanYourNextTravel' }],
    creator: 'PlanYourNextTravel',
    publisher: 'PlanYourNextTravel',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: titles[params.locale] || titles.en,
      description: descriptions[params.locale] || descriptions.en,
      url: pageUrl,
      siteName: 'PlanYourNextTravel',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'PlanYourNextTravel - AI Trip Planner',
        },
      ],
      locale: params.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[params.locale] || titles.en,
      description: descriptions[params.locale] || descriptions.en,
      images: [`${baseUrl}/og-image.jpg`],
      creator: '@planyournexttravel',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'en-US': `${baseUrl}/en`,
        'fr-FR': `${baseUrl}/fr`,
        'ar-AR': `${baseUrl}/ar`,
      },
    },
    verification: {
      google: 'google-site-verification-code-here',
    },
  };
}


export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale });
  // Get first 6 blog posts for the locale
  const allPosts = getBlogPosts(locale);
  const featuredPosts = allPosts.slice(0, 6);

  const features = [
    { icon: 'zap', title: t('features.ai.title'), description: t('features.ai.description') },
    { icon: 'clock', title: t('features.instant.title'), description: t('features.instant.description') },
    { icon: 'globe', title: t('features.multilingual.title'), description: t('features.multilingual.description') },
    { icon: 'check', title: t('features.detailed.title'), description: t('features.detailed.description') },
    { icon: 'dollar', title: t('features.budget.title'), description: t('features.budget.description') },
    { icon: 'star', title: t('features.free.title'), description: t('features.free.description') }
  ];

  const faqs = [
    { q: t('faq.q1.question'), a: t('faq.q1.answer') },
    { q: t('faq.q2.question'), a: t('faq.q2.answer') },
    { q: t('faq.q3.question'), a: t('faq.q3.answer') },
    { q: t('faq.q4.question'), a: t('faq.q4.answer') },
    { q: t('faq.q5.question'), a: t('faq.q5.answer') },
    { q: t('faq.q6.question'), a: t('faq.q6.answer') }
  ];

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5200';

  // JSON-LD Structured Data for Organization and WebSite
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PlanYourNextTravel',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'AI-powered travel planning platform that creates personalized itineraries',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@planyournexttravel.com'
    },
    sameAs: [
      'https://twitter.com/planyournexttravel',
      'https://facebook.com/planyournexttravel',
      'https://instagram.com/planyournexttravel'
    ]
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PlanYourNextTravel',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen flex flex-col">
        <Header />

      <main className="flex-1">
        {/* Hero Section - With Floating Cards */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Animated mesh gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse-slow"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
              <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float-delayed"></div>
              <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
            </div>
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-white opacity-5"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Content */}
              <div className="text-left space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full backdrop-blur-sm">
                  <FiTrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-semibold text-blue-300">#1 AI Trip Planner</span>
                  <FiAward className="w-4 h-4 text-yellow-400" />
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-tight">
                  <span className="text-white">Your Next</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Adventure Awaits
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
                  ✨ AI-powered itineraries tailored just for you. <br className="hidden sm:block" />
                  From budget travel to luxury escapes.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="#generator"
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-2xl hover:scale-105"
                  >
                    <FiZap className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span>Start Planning Free</span>
                    <FiArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </a>

                  <Link
                    href={`/${locale}/blog`}
                    className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-lg hover:bg-white/20 transition-all shadow-xl"
                  >
                    <span>Explore Guides</span>
                    <FiGlobe className="w-4 sm:w-5 h-4 sm:h-5" />
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-8">
                  <div className="bg-white/10 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-white/20">
                    <div className="text-2xl sm:text-3xl font-black text-white mb-1">50K+</div>
                    <div className="text-xs text-white/80 font-semibold">Happy Travelers</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-white/20">
                    <div className="text-2xl sm:text-3xl font-black text-white mb-1">150+</div>
                    <div className="text-xs text-white/80 font-semibold">Countries</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-white/20">
                    <div className="text-2xl sm:text-3xl font-black text-white mb-1">4.9★</div>
                    <div className="text-xs text-white/80 font-semibold">User Rating</div>
                  </div>
                </div>
              </div>

              {/* Right side - Floating Itinerary Cards */}
              <div className="hidden lg:block relative h-[600px]">
                {/* Card 1 - Paris */}
                <div className="absolute top-0 right-0 w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border-2 border-white/50 animate-float">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-2xl">
                      🗼
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900">Paris, France</h3>
                      <p className="text-sm text-gray-600">5-Day Adventure</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiMapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-sm text-gray-700">Eiffel Tower, Louvre Museum</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiDollarSign className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="text-sm text-gray-700">$1,200 - $1,800 budget</div>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Tokyo */}
                <div className="absolute top-1/2 left-0 w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border-2 border-white/50 animate-float-delayed">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-2xl">
                      🗾
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900">Tokyo, Japan</h3>
                      <p className="text-sm text-gray-600">7-Day Discovery</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiMapPin className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="text-sm text-gray-700">Shibuya, Senso-ji Temple</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiDollarSign className="w-4 h-4 text-orange-600" />
                      </div>
                      <div className="text-sm text-gray-700">$2,000 - $2,800 budget</div>
                    </div>
                  </div>
                </div>

                {/* Card 3 - Bali */}
                <div className="absolute bottom-0 right-10 w-80 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border-2 border-white/50 animate-float">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-2xl">
                      🏝️
                    </div>
                    <div>
                      <h3 className="font-black text-gray-900">Bali, Indonesia</h3>
                      <p className="text-sm text-gray-600">10-Day Paradise</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiMapPin className="w-4 h-4 text-teal-600" />
                      </div>
                      <div className="text-sm text-gray-700">Ubud, Seminyak Beach</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiDollarSign className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-sm text-gray-700">$800 - $1,400 budget</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trip Generator Section */}
        <section id="generator" className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-sm">
                🚀 START YOUR JOURNEY
              </div>
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
                {t('generator.title')}
              </h2>
              <p className="text-2xl text-gray-700 max-w-2xl mx-auto font-medium">
                {t('generator.subtitle')}
              </p>
            </div>
            <TripGeneratorWizard />
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-6">
                {t('features.title')}
              </h2>
              <p className="text-2xl text-gray-700 font-medium">{t('features.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[ 
                { ...features[0], gradient: 'from-yellow-400 to-orange-500', bg: 'bg-gradient-to-br from-yellow-50 to-orange-50' },
                { ...features[1], gradient: 'from-green-400 to-cyan-500', bg: 'bg-gradient-to-br from-green-50 to-cyan-50' },
                { ...features[2], gradient: 'from-blue-400 to-indigo-500', bg: 'bg-gradient-to-br from-blue-50 to-indigo-50' },
                { ...features[3], gradient: 'from-purple-400 to-pink-500', bg: 'bg-gradient-to-br from-purple-50 to-pink-50' },
                { ...features[4], gradient: 'from-red-400 to-rose-500', bg: 'bg-gradient-to-br from-red-50 to-rose-50' },
                { ...features[5], gradient: 'from-teal-400 to-emerald-500', bg: 'bg-gradient-to-br from-teal-50 to-emerald-50' },
              ].map((feature, index) => (
                        {/* Testimonials Section */}
                        <section className="py-24 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
                          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                                What Our Users Say
                              </h2>
                              <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
                                Real travelers. Real experiences. See why thousands trust PlanYourNextTravel for their adventures!
                              </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              {/* Testimonial 1 */}
                              <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" className="w-20 h-20 rounded-full mb-4 border-4 border-blue-200" />
                                <h3 className="font-bold text-lg text-gray-900 mb-1">Emily R.</h3>
                                <p className="text-gray-600 mb-3 text-sm">London, UK</p>
                                <p className="text-gray-700 text-base italic mb-2">“I planned my entire honeymoon in minutes! The AI suggestions were spot on and saved us so much time.”</p>
                                <div className="flex gap-1 justify-center">
                                  {[...Array(5)].map((_, i) => <FiStar key={i} className="text-yellow-400" />)}
                                </div>
                              </div>
                              {/* Testimonial 2 */}
                              <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" className="w-20 h-20 rounded-full mb-4 border-4 border-purple-200" />
                                <h3 className="font-bold text-lg text-gray-900 mb-1">Carlos M.</h3>
                                <p className="text-gray-600 mb-3 text-sm">Barcelona, Spain</p>
                                <p className="text-gray-700 text-base italic mb-2">“The itinerary was detailed and perfectly matched my interests. Highly recommend for solo travelers!”</p>
                                <div className="flex gap-1 justify-center">
                                  {[...Array(5)].map((_, i) => <FiStar key={i} className="text-yellow-400" />)}
                                </div>
                              </div>
                              {/* Testimonial 3 */}
                              <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                                <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" className="w-20 h-20 rounded-full mb-4 border-4 border-pink-200" />
                                <h3 className="font-bold text-lg text-gray-900 mb-1">Aisha K.</h3>
                                <p className="text-gray-600 mb-3 text-sm">Dubai, UAE</p>
                                <p className="text-gray-700 text-base italic mb-2">“I love how easy it is to use and how much money I saved. My family trip was unforgettable!”</p>
                                <div className="flex gap-1 justify-center">
                                  {[...Array(5)].map((_, i) => <FiStar key={i} className="text-yellow-400" />)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                <div
                  key={index}
                  className={`${feature.bg} p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 border-2 border-white/50`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} text-white rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-700 font-medium">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-bold text-sm">
                📚 TRAVEL INSPIRATION
              </div>
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-6">
                Latest Travel Guides
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Expert tips, destination guides, and travel stories to inspire your next adventure
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { ...features[0], gradient: 'from-yellow-400 to-orange-500', bg: 'bg-gradient-to-br from-yellow-50 to-orange-50' },
                { ...features[1], gradient: 'from-green-400 to-cyan-500', bg: 'bg-gradient-to-br from-green-50 to-cyan-50' },
                { ...features[2], gradient: 'from-blue-400 to-indigo-500', bg: 'bg-gradient-to-br from-blue-50 to-indigo-50' },
                { ...features[3], gradient: 'from-purple-400 to-pink-500', bg: 'bg-gradient-to-br from-purple-50 to-pink-50' },
                { ...features[4], gradient: 'from-red-400 to-rose-500', bg: 'bg-gradient-to-br from-red-50 to-rose-50' },
                { ...features[5], gradient: 'from-teal-400 to-emerald-500', bg: 'bg-gradient-to-br from-teal-50 to-emerald-50' },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`rounded-2xl shadow-lg p-8 flex flex-col items-center text-center ${feature.bg}`}
                >
                  <div className={`mb-4 p-4 rounded-full bg-gradient-to-br ${feature.gradient} text-white`}>
                    {feature.icon === 'zap' && <FiZap className="w-8 h-8" />}
                    {feature.icon === 'clock' && <FiClock className="w-8 h-8" />}
                    {feature.icon === 'globe' && <FiGlobe className="w-8 h-8" />}
                    {feature.icon === 'check' && <FiCheckCircle className="w-8 h-8" />}
                    {feature.icon === 'dollar' && <FiDollarSign className="w-8 h-8" />}
                    {feature.icon === 'star' && <FiStar className="w-8 h-8" />}
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-base">{feature.description}</p>
                </div>
              ))}
            </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                      <FiClock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                      <span>•</span>
                      <span>{new Date(post.date).toLocaleDateString(locale)}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 transition-all">
                      Read More
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-xl"
              >
                View All Articles
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black mb-6 drop-shadow-lg">{t('howItWorks.title')}</h2>
              <p className="text-2xl text-white/90 font-medium drop-shadow">{t('howItWorks.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-3xl flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform border-4 border-white/30">
                  1
                </div>
                <h3 className="text-3xl font-bold mb-4 drop-shadow">
                  {t('howItWorks.step1.title')}
                </h3>
                <p className="text-xl text-white/90 font-medium">{t('howItWorks.step1.description')}</p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 text-white rounded-3xl flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform border-4 border-white/30">
                  2
                </div>
                <h3 className="text-3xl font-bold mb-4 drop-shadow">
                  {t('howItWorks.step2.title')}
                </h3>
                <p className="text-xl text-white/90 font-medium">{t('howItWorks.step2.description')}</p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 text-white rounded-3xl flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform border-4 border-white/30">
                  3
                </div>
                <h3 className="text-3xl font-bold mb-4 drop-shadow">
                  {t('howItWorks.step3.title')}
                </h3>
                <p className="text-xl text-white/90 font-medium">{t('howItWorks.step3.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">{t('faq.title')}</h2>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer"
                >
                  <summary className="font-semibold text-lg text-gray-900">{faq.q}</summary>
                  <p className="mt-4 text-gray-600">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Redesigned */}
        <section className="relative py-32 overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600"></div>
          <div className="absolute inset-0 bg-grid-white opacity-10"></div>
          
          {/* Floating shapes */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-float-delayed"></div>
          
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full mb-8">
                <span className="text-2xl">✈️</span>
                <span className="text-white font-bold text-sm uppercase tracking-wider">Start Your Journey</span>
                <span className="text-2xl">🌍</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                {t('cta.title')}
              </h2>
              
              {/* Subtitle */}
              <p className="text-2xl md:text-3xl text-white/90 mb-12 font-medium max-w-3xl mx-auto drop-shadow-lg">
                {t('cta.subtitle')}
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="text-5xl font-black text-white mb-2">10K+</div>
                  <div className="text-white/90 font-semibold">Happy Travelers</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="text-5xl font-black text-white mb-2">150+</div>
                  <div className="text-white/90 font-semibold">Countries Covered</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                  <div className="text-5xl font-black text-white mb-2">4.9★</div>
                  <div className="text-white/90 font-semibold">Average Rating</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="#generator"
                  className="group inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-white/20"
                >
                  <span>{t('cta.button')}</span>
                  <FiArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </a>
                <a
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border-2 border-white/40 text-white px-8 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
                >
                  <span>📚 Read Travel Guides</span>
                </a>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5 text-green-300" />
                  <span>100% Free to Use</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5 text-green-300" />
                  <span>No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-5 h-5 text-green-300" />
                  <span>AI-Powered Itineraries</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      </div>
    </>
  );
}
