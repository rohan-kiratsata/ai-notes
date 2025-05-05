"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../../utils/supabase/client";

type ArchivedNoteItemProps = {
  note: {
    id: string;
    title: string;
    content: string;
    updated_at: string;
  };
};

export default function ArchivedNoteItem({ note }: ArchivedNoteItemProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isRestoring, setIsRestoring] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleRestore() {
    setIsRestoring(true);

    try {
      const { error } = await supabase
        .from("notes")
        .update({ is_archived: false })
        .eq("id", note.id);

      if (error) throw error;
      router.refresh();
    } catch (error) {
      console.error("Error restoring note:", error);
      alert("Failed to restore note. Please try again.");
    } finally {
      setIsRestoring(false);
    }
  }

  async function handleDelete() {
    if (
      !confirm(
        "Are you sure you want to permanently delete this note? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const { error } = await supabase.from("notes").delete().eq("id", note.id);

      if (error) throw error;
      router.refresh();
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm">
      <h2 className="text-xl font-semibold mb-2 truncate">{note.title}</h2>
      <p className="text-gray-600 truncate mb-4">{note.content}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {new Date(note.updated_at).toLocaleDateString()}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={handleRestore}
            disabled={isRestoring}
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-70"
          >
            {isRestoring ? "Restoring..." : "Restore"}
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-70"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
