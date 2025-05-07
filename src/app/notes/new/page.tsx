import { createClient } from "../../../supabase/server";
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
    <div className="mx-auto flex w-full max-w-2xl flex-col p-4">
      <h1 className="mb-6 text-3xl font-bold">Create New Note</h1>
      <NoteForm userId={user.id} />
    </div>
  );
}
