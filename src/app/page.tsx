import Link from "next/link";
import { createClient } from "@/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
      <h1 className="mb-6 text-4xl font-bold">Welcome to AI Notes</h1>
      <p className="mb-8 max-w-2xl text-xl">
        Your secure and intelligent note-taking application powered by Supabase
        authentication
      </p>
      <div className="flex space-x-4">
        {user ? (
          <Link
            href="/dashboard"
            className="rounded-md bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="rounded-md bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-md bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
