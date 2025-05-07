import { createClient } from "@/supabase/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  // Check if a user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  return NextResponse.redirect(new URL("/login", req.url), {
    status: 302,
  });
}
