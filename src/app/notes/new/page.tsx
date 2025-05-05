import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import NoteForm from "../components/note-form";

export default async function NewNotePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Create New Note</h1>
      <NoteForm userId={user.id} />
    </div>
  );
}
