import Image from 'next/image';

interface PartnerLogoProps {
  name: 'agoda' | 'booking' | 'expedia' | 'skyscanner' | 'getyourguide' | 'klook';
  className?: string;
}

const LOGO_PATHS: Record<PartnerLogoProps['name'], string> = {
  agoda: '/agoda.png?v=3',
  booking: '/booking.png?v=3',
  expedia: '/expedia.png?v=3',
  skyscanner: '/Skyscanner.png?v=3',
  getyourguide: '/getyourguide.png?v=3',
  klook: '/klook.png?v=3',
};

const LOGO_NAMES: Record<PartnerLogoProps['name'], string> = {
  agoda: 'Agoda',
  booking: 'Booking.com',
  expedia: 'Expedia',
  skyscanner: 'Skyscanner',
  getyourguide: 'GetYourGuide',
  klook: 'Klook',
};

export function PartnerLogo({ name, className = '' }: PartnerLogoProps) {
  return (
    <Image
      src={LOGO_PATHS[name]}
      alt={LOGO_NAMES[name]}
      width={120}
      height={40}
      className={`object-contain ${className}`}
    />
  );
}

export const PartnerLogos = {
  Agoda: () => <PartnerLogo name="agoda" />,
  Booking: () => <PartnerLogo name="booking" />,
  Expedia: () => <PartnerLogo name="expedia" />,
  Skyscanner: () => <PartnerLogo name="skyscanner" />,
  GetYourGuide: () => <PartnerLogo name="getyourguide" />,
  Klook: () => <PartnerLogo name="klook" />,
};
