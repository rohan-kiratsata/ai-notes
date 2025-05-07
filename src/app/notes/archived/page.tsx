import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import ArchivedNoteItem from "../components/archived-note-item";

export default async function ArchivedNotesPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // Fetch archived notes
  const { data: notes, error: notesError } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_archived", true)
    .order("updated_at", { ascending: false });

  if (notesError) {
    console.error("Error fetching archived notes:", notesError);
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Archived Notes</h1>
        <Link
          href="/dashboard"
          className="rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
        >
          Back to Dashboard
        </Link>
      </div>

      {notes && notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note) => (
            <ArchivedNoteItem key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <h2 className="mb-2 text-xl font-semibold">No archived notes</h2>
          <p className="mb-6 text-gray-600">Archived notes will appear here.</p>
          <Link
            href="/dashboard"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Return to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
