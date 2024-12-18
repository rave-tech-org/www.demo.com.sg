import { type NextRequest, NextResponse } from 'next/server';

export const middleware = (req: NextRequest) => {
  const res = NextResponse.next();
  const path = req.nextUrl.pathname;

  if (req.nextUrl.searchParams.get('isDraft')) {
    res.headers.set('isDraft', 'true');
    res.headers.set('callbackPath', path);
  } else res.headers.set('isDraft', '');

  return res;
};

export const config = { matcher: ['/((?!api|studio|_next|_vercel|.*\\..*).*)'] };
