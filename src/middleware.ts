import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    const url = request.nextUrl.clone();
    url.protocol = 'https';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
