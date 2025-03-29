import { NextRequest, NextResponse } from "next/server";

// If the incoming request has the "token" cookie
export function middleware(request: NextRequest) {
  const has_token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const clearCookiesAndRedirect = () => {
    const signInUrl = new URL('/', request.url);
    signInUrl.searchParams.set('redirect', pathname);
    const response = NextResponse.redirect(signInUrl);
      response.cookies.set("token", '', {
        expires: new Date(0),
        path: '/',
      });
    
    return response;
  };

  // const { pathname } = request.nextUrl;

  if (has_token === undefined || has_token === null) {
    // request.nextUrl.pathname = "/";

    // return NextResponse.redirect(request.nextUrl);

    return clearCookiesAndRedirect();
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/dashboard/:path*']
};
