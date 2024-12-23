'use client';

import { useDraftModeEnvironment } from 'next-sanity/hooks';
import Link from 'next/link';

export function DisableDraftMode() {
  const environment = useDraftModeEnvironment();

  if (environment !== 'live' && environment !== 'unknown') {
    return null;
  }

  return (
    <Link href="/api/draft-mode/disable" className="fixed bottom-4 left-4 bg-black text-white px-2 z-[9999]">
      Disable Draft Mode
    </Link>
  );
}
