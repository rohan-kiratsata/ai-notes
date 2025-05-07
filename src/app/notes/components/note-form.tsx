"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/supabase/client";

type NoteFormProps = {
  userId: string;
  note?: {
    id: string;
    title: string;
    content: string;
  };
};

export default function NoteForm({ userId, note }: NoteFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!note;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);

    try {
      if (isEditing) {
        // Update existing note
        const { error } = await supabase
          .from("notes")
          .update({
            title,
            content,
            updated_at: new Date().toISOString(),
          })
          .eq("id", note.id)
          .eq("user_id", userId);

        if (error) throw error;
        router.push(`/notes/${note.id}`);
      } else {
        // Create new note
        const { data, error } = await supabase
          .from("notes")
          .insert({
            title,
            content,
            user_id: userId,
          })
          .select("id")
          .single();

        if (error) throw error;
        router.push(`/notes/${data.id}`);
      }
    } catch (e: any) {
      setError(e.message || "An error occurred");
      console.error("Error saving note:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Note title"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="mb-1 block text-sm font-medium">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px] w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="Write your note here..."
        />
      </div>

      <div className="flex justify-between">
        <Link
          href="/dashboard"
          className="rounded-md border border-gray-300 px-4 py-2 transition-colors hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 disabled:opacity-70"
        >
          {loading ? "Saving..." : isEditing ? "Update Note" : "Create Note"}
        </button>
      </div>
    </form>
  );
}
