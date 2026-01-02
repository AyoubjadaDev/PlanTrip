'use client';

import { useEffect, useState } from 'react';

interface AdDisplayProps {
  position: 'header' | 'sidebar';
  className?: string;
}

export default function AdDisplay({ position, className = '' }: AdDisplayProps) {
  const [adCode, setAdCode] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/site-settings')
      .then(res => res.json())
      .then(data => {
        if (data.settings) {
          if (position === 'header') {
            setAdCode(data.settings.headerAdCode || '');
          } else if (position === 'sidebar') {
            setAdCode(data.settings.sidebarAdCode || '');
          }
        }
      })
      .finally(() => setLoading(false));
  }, [position]);

  if (loading || !adCode) {
    return null;
  }

  return (
    <div 
      className={`ad-container ${className}`}
      dangerouslySetInnerHTML={{ __html: adCode }}
    />
  );
}
