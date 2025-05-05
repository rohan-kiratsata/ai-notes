import { createClient } from "../../../../utils/supabase/server";
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
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Archived Notes</h1>
        <Link
          href="/dashboard"
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
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
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No archived notes</h2>
          <p className="text-gray-600 mb-6">Archived notes will appear here.</p>
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
