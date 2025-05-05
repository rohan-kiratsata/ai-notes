import Link from "next/link";
import { createClient } from "../../utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to AI Notes</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Your secure and intelligent note-taking application powered by Supabase
        authentication
      </p>
      <div className="flex space-x-4">
        {user ? (
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
