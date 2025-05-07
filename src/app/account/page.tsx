import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import AccountForm from "./account-form";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="mb-6 text-2xl font-bold">Account</h1>
      <AccountForm user={user} />
    </div>
  );
}
