import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import NoteActions from "../components/note-actions";

export default async function NotePage({ params }: { params: { id: string } }) {
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
    <div className="flex flex-col w-full max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <Link
          href="/dashboard"
          className="text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          &larr; Back to Dashboard
        </Link>
        <NoteActions noteId={note.id} />
      </div>

      <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        Last updated: {new Date(note.updated_at).toLocaleString()}
      </div>

      <div className="prose max-w-none">
        {note.content ? (
          <div className="whitespace-pre-wrap">{note.content}</div>
        ) : (
          <p className="text-gray-500 italic">No content</p>
        )}
      </div>
    </div>
  );
}
