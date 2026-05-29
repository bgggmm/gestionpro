import { createServerClient } from "@supabase/ssr";

import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function proxy(
  request: NextRequest
) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) =>
              response.cookies.set(
                name,
                value,
                options
              )
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname =
    request.nextUrl.pathname;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register");

  const isDashboard =
    pathname.startsWith("/dashboard");

  if (!user && isDashboard) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  if (user && isAuthPage) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  // ADMIN PROTECTION
  if (
    pathname.startsWith(
      "/dashboard/admin"
    )
  ) {
    const { data: profile } =
      await supabase
        .from("profiles")
        .select("role")
        .eq("id", user?.id)
        .single();

    if (profile?.role !== "admin") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};