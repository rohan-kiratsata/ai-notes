"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../../utils/supabase/client";

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
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Note title"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[200px]"
          placeholder="Write your note here..."
        />
      </div>

      <div className="flex justify-between">
        <Link
          href="/dashboard"
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-70"
        >
          {loading ? "Saving..." : isEditing ? "Update Note" : "Create Note"}
        </button>
      </div>
    </form>
  );
}
