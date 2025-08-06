import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const error = searchParams.get("error");
  const error_description = searchParams.get("error_description");

  if (error) {
    // Handle errors (e.g., user didn't confirm)
    return NextResponse.redirect(
      `${origin}/auth/error?error=${error}&description=${error_description}`
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Successful confirmation - redirect to intended page
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Something went wrong
  return NextResponse.redirect(`${origin}/auth/error`);
}
