import { createClient } from "../../../utils/supabase/server";
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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-6">Account</h1>
      <AccountForm user={user} />
    </div>
  );
}
