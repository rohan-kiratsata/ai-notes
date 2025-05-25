import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
  return (
    <header className="flex justify-between pb-3">
      <div className="flex gap-3">
        <div className="flex items-center gap-2">
          <kbd className="kbd">
            <span className="text-sm">⌘</span>K
          </kbd>
          <span className="text-muted-foreground text-sm">Create new note</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[13px] font-medium opacity-100 select-none">
            <span className="text-sm">⌘</span>J
          </kbd>
          <span className="text-muted-foreground text-sm">Ask anything</span>
        </div>
      </div>
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
}
