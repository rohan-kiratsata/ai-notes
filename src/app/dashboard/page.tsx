import Header from "@/components/dashboard/header";
import Note from "@/components/global/note";
import { Note as NoteType } from "@/types/note";
import Image from "next/image";

export default async function DashboardPage() {
  //  dummy data
  const notes: NoteType[] = [
    {
      id: "1",
      title: "Note 1",
      content: "Content 1",
      is_archived: false,
      created_at: "2021-01-01",
      updated_at: "2021-01-01",
    },
    {
      id: "2",
      title: "Note 2",
      content: "Content 2",
      is_archived: false,
      created_at: "2021-01-01",
      updated_at: "2021-01-01",
    },
  ];

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
