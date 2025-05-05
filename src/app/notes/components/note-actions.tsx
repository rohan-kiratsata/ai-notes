"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../../utils/supabase/client";

type NoteActionsProps = {
  noteId: string;
};

export default function NoteActions({ noteId }: NoteActionsProps) {
  const router = useRouter();
  const supabase = createClient();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

  async function handleDelete() {
    if (
      !confirm(
        "Are you sure you want to delete this note? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);

    try {
      const { error } = await supabase.from("notes").delete().eq("id", noteId);

      if (error) throw error;
      router.push("/dashboard");
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleArchive() {
    setIsArchiving(true);

    try {
      const { error } = await supabase
        .from("notes")
        .update({ is_archived: true })
        .eq("id", noteId);

      if (error) throw error;
      router.push("/dashboard");
    } catch (error) {
      console.error("Error archiving note:", error);
      alert("Failed to archive note. Please try again.");
    } finally {
      setIsArchiving(false);
    }
  }

  return (
    <div className="flex space-x-2">
      <Link
        href={`/notes/${noteId}/edit`}
        className="px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Edit
      </Link>
      <button
        onClick={handleArchive}
        disabled={isArchiving}
        className="px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors disabled:opacity-70"
      >
        {isArchiving ? "Archiving..." : "Archive"}
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-70"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
