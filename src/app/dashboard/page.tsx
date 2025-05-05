import { createClient } from "../../../utils/supabase/server";

import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/dashboard/header";

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
    <div className="m-4">
      <Header />

      {/* notes container */}
      <div className="">
        {notes?.map((note) => (
          <Link
            href={`/notes/${note.id}`}
            key={note.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2 truncate">
              {note.title}
            </h2>
            <p className="text-gray-600 truncate">{note.content}</p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <span>{new Date(note.updated_at).toLocaleDateString()}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
    // <div className="flex flex-col w-full max-w-4xl mx-auto p-4">
    //   <div className="flex justify-between items-center mb-8">
    //     <h1 className="text-3xl font-bold">My Notes</h1>
    //     <div className="flex space-x-2">
    //       <Link
    //         href="/notes/archived"
    //         className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
    //       >
    //         Archived Notes
    //       </Link>
    //       <Link
    //         href="/notes/new"
    //         className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
    //       >
    //         Create New Note
    //       </Link>
    //     </div>
    //   </div>

    //   {notes && notes.length > 0 ? (
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //       {notes.map((note) => (
    //         <Link
    //           href={`/notes/${note.id}`}
    //           key={note.id}
    //           className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    //         >
    //           <h2 className="text-xl font-semibold mb-2 truncate">
    //             {note.title}
    //           </h2>
    //           <p className="text-gray-600 truncate">{note.content}</p>
    //           <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
    //             <span>{new Date(note.updated_at).toLocaleDateString()}</span>
    //           </div>
    //         </Link>
    //       ))}
    //     </div>
    //   ) : (
    //     <div className="text-center py-12">
    //       <h2 className="text-xl font-semibold mb-2">No notes yet</h2>
    //       <p className="text-gray-600 mb-6">
    //         Create your first note to get started.
    //       </p>
    //       <Link
    //         href="/notes/new"
    //         className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
    //       >
    //         Create New Note
    //       </Link>
    //     </div>
    //   )}
    // </div>
  );
}
