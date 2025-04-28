import Link from "next/link";

export default function SignupSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="text-center max-w-md px-4">
        <h1 className="text-2xl font-bold mb-2">Signup Successful!</h1>
        <div className="mb-4 p-4 bg-green-50 rounded-md text-green-800 border border-green-200">
          <p className="mb-2">
            We've sent you a confirmation email. Please check your inbox and
            click the link to confirm your account.
          </p>
          <p className="text-sm">
            (You might need to check your spam folder if you don't see it in
            your inbox)
          </p>
        </div>
        <Link
          href="/login"
          className="inline-block py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
