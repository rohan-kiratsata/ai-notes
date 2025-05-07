"use client";

import { formatDate } from "@/lib/utils";
import React, { useState } from "react";
import { NoteDialog } from "./note-dialog";
import { type Note } from "@/types/note";

/**
 * idea
 *
 * No direct route or redirection.
 * Opens the note in enlarge view (dialog) when note is clicked
 * Actions
 * - CRUD
 * Feature
 * - Focus mode
 * - AI thing etc.
 */

type NoteProps = {
  note: Note;
  onClick?: (note: Note) => void;
};

export default function Note({ note, onClick }: NoteProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => {
    setIsDialogOpen(true);
    onClick?.(note);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="group relative h-[300px] max-h-[400px] w-[300px] cursor-pointer rounded-lg border border-neutral-800 bg-zinc-900 p-3"
      >
        <div>
          <p className="text-muted-foreground text-sm font-medium">
            {note.content}
          </p>
        </div>
        {/* footer */}
        <div className="absolute right-0 bottom-0 left-0 px-3 py-1 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-xs font-medium">
              Updated: {formatDate(note.updated_at)}
            </p>
          </div>
        </div>
      </div>

      <NoteDialog
        note={note}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
