/**
 * Affiliate Links Configuration
 * 
 * Replace the placeholder affiliate IDs with your actual affiliate partner IDs:
 * - Agoda: Sign up at https://www.agodapartners.com/
 * - Booking.com: Sign up at https://www.booking.com/affiliate
 * - Expedia: Sign up at https://welcome.expediapartnercentral.com/
 * - Skyscanner: Sign up at https://www.skyscanner.net/media/
 * - GetYourGuide: Sign up at https://partner.getyourguide.com/
 * - Klook: Sign up at https://www.klookaffiliates.com/
 */

export const AFFILIATE_IDS = {
  agoda: process.env.NEXT_PUBLIC_AGODA_AFFILIATE_ID || '',
  booking: process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID || '',
  expedia: process.env.NEXT_PUBLIC_EXPEDIA_AFFILIATE_ID || '',
  skyscanner: process.env.NEXT_PUBLIC_SKYSCANNER_AFFILIATE_ID || '',
  getyourguide: process.env.NEXT_PUBLIC_GETYOURGUIDE_PARTNER_ID || '',
  klook: process.env.NEXT_PUBLIC_KLOOK_AFFILIATE_ID || '',
};

// Regions considered as Asia for affiliate selection
const ASIA_COUNTRIES = [
  'japan', 'china', 'thailand', 'singapore', 'malaysia', 'indonesia', 'vietnam',
  'philippines', 'cambodia', 'laos', 'myanmar', 'south korea', 'taiwan', 'hong kong',
  'macau', 'india', 'nepal', 'sri lanka', 'bangladesh', 'maldives', 'bali'
];

/**
 * Check if destination is in Asia
 */
export function isAsiaDestination(destination: string): boolean {
  const lowerDestination = destination.toLowerCase();
  return ASIA_COUNTRIES.some(country => lowerDestination.includes(country));
}

/**
 * Generate hotel booking links based on destination and preferences
 */
export interface HotelLinks {
  provider: 'agoda' | 'booking' | 'expedia';
  providerName: string;
  searchUrl: string;
  displayText: string;
}

export function getHotelLinks(destination: string, checkIn: Date, checkOut: Date): HotelLinks {
  const isAsia = isAsiaDestination(destination);
  const checkin = checkIn.toISOString().split('T')[0];
  const checkout = checkOut.toISOString().split('T')[0];
  const encodedDestination = encodeURIComponent(destination);

  if (isAsia) {
    return {
      provider: 'agoda',
      providerName: 'Agoda',
      searchUrl: `https://www.agoda.com/search?city=${encodedDestination}&checkIn=${checkin}&checkOut=${checkout}&cid=${AFFILIATE_IDS.agoda}`,
      displayText: `Find Hotels on Agoda`,
    };
  }

  // Default to Booking.com for non-Asia destinations
  return {
    provider: 'booking',
    providerName: 'Booking.com',
    searchUrl: `https://www.booking.com/searchresults.html?ss=${encodedDestination}&checkin=${checkin}&checkout=${checkout}&aid=${AFFILIATE_IDS.booking}`,
    displayText: `Find Hotels on Booking.com`,
  };
}

/**
 * Generate alternative hotel booking link (Expedia)
 */
export function getAlternativeHotelLink(destination: string, checkIn: Date, checkOut: Date): HotelLinks {
  const checkin = checkIn.toISOString().split('T')[0];
  const checkout = checkOut.toISOString().split('T')[0];
  const encodedDestination = encodeURIComponent(destination);

  return {
    provider: 'expedia',
    providerName: 'Expedia',
    searchUrl: `https://www.expedia.com/Hotel-Search?destination=${encodedDestination}&startDate=${checkin}&endDate=${checkout}&affid=${AFFILIATE_IDS.expedia}`,
    displayText: `Compare Prices on Expedia`,
  };
}

/**
 * Generate flight search link
 */
export interface FlightLink {
  provider: 'skyscanner';
  providerName: string;
  searchUrl: string;
  displayText: string;
}

export function getFlightLink(origin: string, destination: string, departDate: Date, returnDate?: Date): FlightLink {
  const depart = departDate.toISOString().split('T')[0].replace(/-/g, '');
  const encodedOrigin = encodeURIComponent(origin);
  const encodedDestination = encodeURIComponent(destination);
  
  let searchUrl: string;
  
  if (returnDate) {
    const returnDateStr = returnDate.toISOString().split('T')[0].replace(/-/g, '');
    searchUrl = `https://www.skyscanner.com/transport/flights/${encodedOrigin}/${encodedDestination}/${depart}/${returnDateStr}/?associateid=${AFFILIATE_IDS.skyscanner}`;
  } else {
    searchUrl = `https://www.skyscanner.com/transport/flights/${encodedOrigin}/${encodedDestination}/${depart}/?associateid=${AFFILIATE_IDS.skyscanner}`;
  }

  return {
    provider: 'skyscanner',
    providerName: 'Skyscanner',
    searchUrl,
    displayText: `Compare Flight Prices on Skyscanner`,
  };
}

/**
 * Generate activities link
 */
export interface ActivityLink {
  provider: 'getyourguide' | 'klook';
  providerName: string;
  searchUrl: string;
  displayText: string;
}

export function getActivityLink(destination: string, activityType?: string): ActivityLink {
  const isAsia = isAsiaDestination(destination);
  const encodedDestination = encodeURIComponent(destination);
  const encodedActivity = activityType ? encodeURIComponent(activityType) : '';

  if (isAsia) {
    return {
      provider: 'klook',
      providerName: 'Klook',
      searchUrl: `https://www.klook.com/search/?query=${encodedDestination}${encodedActivity ? `+${encodedActivity}` : ''}&aff_adid=${AFFILIATE_IDS.klook}`,
      displayText: `Book Activities on Klook`,
    };
  }

  return {
    provider: 'getyourguide',
    providerName: 'GetYourGuide',
    searchUrl: `https://www.getyourguide.com/s/?q=${encodedDestination}${encodedActivity ? `+${encodedActivity}` : ''}&partner_id=${AFFILIATE_IDS.getyourguide}`,
    displayText: `Book Activities on GetYourGuide`,
  };
}

/**
 * Get all relevant booking links based on user preferences
 */
export interface BookingLinks {
  hotels?: {
    primary: HotelLinks;
    alternative: HotelLinks;
  };
  flights?: FlightLink;
  activities: ActivityLink;
}

export function getAllBookingLinks(
  destination: string,
  startDate: Date,
  endDate: Date,
  includeHotel: boolean,
  includeFlights: boolean,
  userLocation?: string
): BookingLinks {
  const links: BookingLinks = {
    activities: getActivityLink(destination),
  };

  if (includeHotel) {
    links.hotels = {
      primary: getHotelLinks(destination, startDate, endDate),
      alternative: getAlternativeHotelLink(destination, startDate, endDate),
    };
  }

  if (includeFlights) {
    // Use userLocation or default to 'anywhere' for search
    const origin = userLocation || 'anywhere';
    links.flights = getFlightLink(origin, destination, startDate, endDate);
  }

  return links;
}

/**
 * Format booking suggestions for AI prompt
 */
export function formatBookingSuggestionsForAI(
  destination: string,
  startDate: Date,
  endDate: Date,
  includeHotel: boolean,
  includeFlights: boolean,
  language: string
): string {
  const links = getAllBookingLinks(destination, startDate, endDate, includeHotel, includeFlights);
  const isAsia = isAsiaDestination(destination);

  const translations = {
    en: {
      hotelSuggestion: `📍 **Hotel Recommendations**: Search and book accommodations on ${links.hotels?.primary.providerName} or compare prices on ${links.hotels?.alternative.providerName}`,
      flightSuggestion: `✈️ **Flight Options**: Compare flight prices and find the best deals on ${links.flights?.providerName}`,
      activitySuggestion: `🎯 **Things to Do**: Discover and book exciting activities, tours, and experiences on ${links.activities.providerName}`,
      bothIncluded: 'Include both flight and hotel booking recommendations in the itinerary overview.',
      activityOnly: 'Focus on local activities and experiences. Suggest booking through popular activity platforms.',
    },
    fr: {
      hotelSuggestion: `📍 **Recommandations d'Hôtels**: Recherchez et réservez des hébergements sur ${links.hotels?.primary.providerName} ou comparez les prix sur ${links.hotels?.alternative.providerName}`,
      flightSuggestion: `✈️ **Options de Vol**: Comparez les prix des vols et trouvez les meilleures offres sur ${links.flights?.providerName}`,
      activitySuggestion: `🎯 **Activités**: Découvrez et réservez des activités, des tours et des expériences sur ${links.activities.providerName}`,
      bothIncluded: 'Incluez des recommandations de vol et d\'hôtel dans l\'aperçu de l\'itinéraire.',
      activityOnly: 'Concentrez-vous sur les activités et expériences locales. Suggérez des réservations via des plateformes d\'activités populaires.',
    },
    ar: {
      hotelSuggestion: `📍 **توصيات الفنادق**: ابحث واحجز أماكن الإقامة على ${links.hotels?.primary.providerName} أو قارن الأسعار على ${links.hotels?.alternative.providerName}`,
      flightSuggestion: `✈️ **خيارات الطيران**: قارن أسعار الرحلات الجوية واعثر على أفضل العروض على ${links.flights?.providerName}`,
      activitySuggestion: `🎯 **أنشطة**: اكتشف واحجز أنشطة وجولات وتجارب مثيرة على ${links.activities.providerName}`,
      bothIncluded: 'قم بتضمين توصيات الرحلات الجوية والفنادق في نظرة عامة على خط سير الرحلة.',
      activityOnly: 'ركز على الأنشطة والتجارب المحلية. اقترح الحجز من خلال منصات الأنشطة الشهيرة.',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.en;

  let suggestion = '';

  if (includeHotel && includeFlights) {
    suggestion = `${t.flightSuggestion}\n${t.hotelSuggestion}\n${t.activitySuggestion}\n\n${t.bothIncluded}`;
  } else if (includeHotel) {
    suggestion = `${t.hotelSuggestion}\n${t.activitySuggestion}`;
  } else if (includeFlights) {
    suggestion = `${t.flightSuggestion}\n${t.activitySuggestion}`;
  } else {
    suggestion = `${t.activitySuggestion}\n\n${t.activityOnly}`;
  }

  return suggestion;
}
