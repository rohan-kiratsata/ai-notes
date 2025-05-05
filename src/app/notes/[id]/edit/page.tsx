import { createClient } from "../../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import NoteForm from "../../components/note-form";

export default async function EditNotePage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // Fetch the note
  const { data: note, error: noteError } = await supabase
    .from("notes")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (noteError || !note) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Note</h1>
      <NoteForm userId={user.id} note={note} />
    </div>
  );
}
