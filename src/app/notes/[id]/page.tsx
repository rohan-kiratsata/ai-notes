import { createClient } from "@/supabase/server";
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
    <div className="mx-auto flex w-full max-w-3xl flex-col p-4">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-indigo-600 transition-colors hover:text-indigo-800"
        >
          &larr; Back to Dashboard
        </Link>
        <NoteActions noteId={note.id} />
      </div>

      <h1 className="mb-4 text-3xl font-bold">{note.title}</h1>
      <div className="mb-6 text-sm text-gray-500">
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
