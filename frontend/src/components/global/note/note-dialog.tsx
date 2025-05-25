"use client";

import { type Note } from "@/types/note";
import React, { useState } from "react";
import { Check, Link, RefreshCcw, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type NoteDialogProps = {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
};

export function NoteDialog({ note, isOpen, onClose }: NoteDialogProps) {
  const [isSaving, setIsSaving] = useState(false);

  function saveEdits() {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 3000);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              type: "spring",
              duration: 0.5,
              bounce: 0.3,
            }}
            className="fixed top-1/2 left-1/2 z-50 h-[90vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-neutral-800 bg-zinc-900"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-4 flex items-center justify-between border-b border-neutral-800 p-3"
            >
              {/* header
              - title
              - focus mode
              - markdown settings
              - delete
              - private share link
              */}

              <div className="flex w-full flex-col justify-start gap-4">
                <div className="flex w-full justify-between">
                  {isSaving ? (
                    <button className="text-muted-foreground flex w-fit items-center gap-2 !p-0 text-sm">
                      <RefreshCcw size={16} className="animate-spin" />{" "}
                      Saving...
                    </button>
                  ) : (
                    <Tooltip delayDuration={500}>
                      <TooltipTrigger className="w-fit !p-0">
                        <div
                          className="text-muted-foreground flex w-fit cursor-pointer items-center gap-2 !p-0 text-sm"
                          onClick={saveEdits}
                        >
                          <Check size={16} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        className="border-muted border bg-neutral-900 text-[10px] text-neutral-200"
                        sideOffset={4}
                      >
                        All changes saved
                      </TooltipContent>
                    </Tooltip>
                  )}
                  <div>
                    <Button
                      variant={"ghost"}
                      className="text-muted-foreground h-fit"
                    >
                      <Trash2 size={16} />
                    </Button>
                    <Button
                      variant={"ghost"}
                      className="text-muted-foreground h-fit"
                    >
                      <Link size={16} />
                    </Button>
                    <Button
                      variant={"ghost"}
                      className="text-muted-foreground h-fit"
                    >
                      <Link size={16} />
                    </Button>
                  </div>
                </div>

                <input
                  defaultValue={note.title}
                  placeholder="Untitled"
                  className="text-lg font-medium text-white outline-none placeholder:text-neutral-500 focus:outline-none active:outline-none"
                />
              </div>

              {/* <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg p-2 transition-colors hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </motion.button> */}
            </motion.div>

            {/* Content with fade-in animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="h-[calc(100%-4rem)] overflow-auto"
            >
              <p className="text-muted-foreground">{note.content}</p>
            </motion.div>

            {/* Bottom toolbar with slide-up animation */}
            {/* <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute right-0 bottom-0 left-0 border-t border-neutral-800 bg-zinc-900/80 p-4 backdrop-blur-sm"
            >
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm"
                >
                  Focus Mode
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-zinc-800 px-3 py-1.5 text-sm"
                >
                  AI Assist
                </motion.button>
              </div>
            </motion.div> */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
