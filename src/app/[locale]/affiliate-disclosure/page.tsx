import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FiInfo, FiExternalLink } from 'react-icons/fi';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5200';
  const pageUrl = `${baseUrl}/${params.locale}/affiliate-disclosure`;

  const titles: Record<string, string> = {
    en: 'Affiliate Program Disclosure | PlanMyNextTravel',
    fr: 'Divulgation du Programme d\'Affiliation | PlanMyNextTravel',
    ar: 'إفصاح برنامج الشراكة | PlanMyNextTravel',
  };

  return {
    title: titles[params.locale] || titles.en,
    description: 'Learn about our affiliate partnerships and how we earn commissions from booking platforms.',
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function AffiliateDisclosurePage({ params }: { params: { locale: string } }) {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
        <main className="flex-1 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-full font-bold text-sm shadow-lg">
                <FiInfo className="inline mr-2" />
                DISCLOSURE
              </div>
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Affiliate Disclosure
              </h1>
              <p className="text-xl text-gray-700 font-medium">
                Transparency about our affiliate partnerships
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-gray-100">
              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">What Are Affiliate Links?</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    PlanMyNextTravel participates in various affiliate marketing programs. This means that when you click on certain links on our website and make a purchase or booking, we may earn a commission at no additional cost to you.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    These commissions help us maintain and improve our service, allowing us to continue providing free AI-powered trip planning to travelers worldwide.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partner Networks</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    We partner with trusted travel booking platforms and services, including but not limited to:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
                    <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-xl">
                      <img src="/booking.png" alt="Booking.com" className="h-8 w-auto" />
                    </div>
                    <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-xl">
                      <img src="/agoda.png" alt="Agoda" className="h-8 w-auto" />
                    </div>
                    <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-xl">
                      <img src="/expedia.png" alt="Expedia" className="h-8 w-auto" />
                    </div>
                    <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-xl">
                      <img src="/Skyscanner.png" alt="Skyscanner" className="h-6 w-auto" />
                    </div>
                    <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-xl">
                      <img src="/getyourguide.png" alt="GetYourGuide" className="h-8 w-auto" />
                    </div>
                    <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-xl">
                      <img src="/klook.png" alt="Klook" className="h-8 w-auto" />
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">You Generate a Trip</h3>
                        <p className="text-gray-700">Our AI creates a personalized itinerary with booking recommendations.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">You Click a Booking Link</h3>
                        <p className="text-gray-700">When you click on flight, hotel, or activity links, you're redirected to our partner's website.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-orange-200">
                      <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">You Make a Purchase</h3>
                        <p className="text-gray-700">If you complete a booking, we may earn a small commission at no extra cost to you.</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment to You</h2>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 text-xl">✓</span>
                        <span className="text-gray-700"><strong>No Extra Cost:</strong> Affiliate commissions never increase the price you pay for bookings.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 text-xl">✓</span>
                        <span className="text-gray-700"><strong>Honest Recommendations:</strong> We only recommend services we believe provide value to travelers.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 text-xl">✓</span>
                        <span className="text-gray-700"><strong>Quality First:</strong> Our itineraries are based on travel quality, not affiliate commission rates.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-600 text-xl">✓</span>
                        <span className="text-gray-700"><strong>Your Choice:</strong> You're never obligated to use our affiliate links - shop around for the best deals!</span>
                      </li>
                    </ul>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions?</h2>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    If you have any questions about our affiliate partnerships or how we earn revenue, please don't hesitate to reach out to us.
                  </p>
                  <Link
                    href={`/${params.locale}/contact`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    Contact Us
                    <FiExternalLink />
                  </Link>
                </section>

                <section className="border-t-2 border-gray-200 pt-6">
                  <p className="text-sm text-gray-500">
                    <strong>Last Updated:</strong> January 5, 2026
                  </p>
                </section>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
