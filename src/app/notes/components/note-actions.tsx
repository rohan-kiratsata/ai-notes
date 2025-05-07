"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/supabase/client";

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
        "Are you sure you want to delete this note? This action cannot be undone.",
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
        className="rounded-md bg-indigo-600 px-3 py-1.5 text-white transition-colors hover:bg-indigo-700"
      >
        Edit
      </Link>
      <button
        onClick={handleArchive}
        disabled={isArchiving}
        className="rounded-md bg-gray-600 px-3 py-1.5 text-white transition-colors hover:bg-gray-700 disabled:opacity-70"
      >
        {isArchiving ? "Archiving..." : "Archive"}
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="rounded-md bg-red-600 px-3 py-1.5 text-white transition-colors hover:bg-red-700 disabled:opacity-70"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
}
