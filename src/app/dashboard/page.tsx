import { createClient } from "../../../utils/supabase/server";

import { redirect } from "next/navigation";
import Header from "@/components/dashboard/header";
import Note from "@/components/global/note";
import Image from "next/image";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  // Fetch user's notes
  const { data: notes, error: notesError } = await supabase
    .from("notes")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_archived", false)
    .order("created_at", { ascending: false });

  if (notesError) {
    console.error("Error fetching notes:", notesError);
  }

  return (
    <div className="mx-auto my-3 max-w-5xl">
      <Header />
      <div className="relative grid grid-cols-4 gap-4">
        {notes && notes.length > 0 ? (
          notes.map((note) => <Note key={note.id} note={note} />)
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

const EmptyState = () => {
  return (
    <div className="col-span-4 flex h-[80vh] flex-col items-center justify-center gap-1">
      <Image src="/cat_sad.png" alt="empty state" width={200} height={200} />
      <p className="text-lg font-medium text-neutral-600">
        Ohh wow! So Empty
        <br />
      </p>
      <p className="text-base text-neutral-600">
        <kbd className="kbd">⌘ K</kbd> to create your first note
      </p>
    </div>
  );
};
