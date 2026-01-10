import { Metadata } from 'next';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { FiMail, FiMapPin, FiClock } from 'react-icons/fi';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5200';
  const pageUrl = `${baseUrl}/${params.locale}/contact`;

  return {
    title: 'Contact Us - PlanMyNextTravel | Get Support & Help',
    description: 'Have questions about trip planning? Contact PlanMyNextTravel for support, feedback, or partnership inquiries. 24/7 online support available.',
    keywords: 'contact us, support, customer service, help, feedback, business inquiries',
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: 'Contact PlanMyNextTravel',
      description: 'Get in touch with our team for support, feedback, or partnership inquiries.',
      url: pageUrl,
      type: 'website',
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black text-gray-900 mb-4">
              Get in <span className="bg-gradient-to-r from-primary-600 to-pink-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions, feedback, or need assistance? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
                <FiMail className="text-3xl text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">Email Us</h3>
              <p className="text-gray-600 mb-3">Send us your questions anytime</p>
              <a 
                href="mailto:contact@planmynexttravel.com" 
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                contact@planmynexttravel.com
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mb-4">
                <FiMapPin className="text-3xl text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">Location</h3>
              <p className="text-gray-600 mb-3">Serving travelers worldwide</p>
              <p className="text-gray-700 font-semibold">Global - 24/7 Available</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-600 rounded-full mb-4">
                <FiClock className="text-3xl text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">Response Time</h3>
              <p className="text-gray-600 mb-3">We respond quickly</p>
              <p className="text-gray-700 font-semibold">Within 24-48 Hours</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto">
            <ContactForm />
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mt-12">
            <div className="bg-gradient-to-r from-primary-50 to-purple-50 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-3xl mr-3">❓</span>
                Frequently Asked Questions
              </h2>
              <p className="text-gray-700 mb-4">
                Before reaching out, check our FAQ section on the homepage for quick answers to common questions about:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <span>How to create your personalized trip itinerary</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <span>Understanding our AI-powered recommendations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <span>Account management and saved trips</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <span>Privacy and data security</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
