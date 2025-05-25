"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

const staggerDelay = 0.12; // Quicker delay between blocks

export default function Home() {
  const [isSimplified, setIsSimplified] = useState(false);

  const content = {
    original: {
      heading: {
        text: ["Your bookmarks are a mess.", "So I used AI to babysit them."],
      },
      blocks: [
        {
          text: [
            "If you're online enough to need this app, you are probably cooked.",
            "You probably have 9 half baked notes, 3 startup ideas, 69 tabs open, and zero clue where you saved that one banger tweet idea.",
          ],
        },
        {
          text: [
            "No, Not your fault.",
            "Your current tools weren't built for chaos.",
          ],
        },
        {
          text: ["Beaconite was."],
          className: "text-white",
        },
        {
          text: [
            "Copy paste images, videos, articles, links, tweets, code snippets, write notes, write more notes, basically anything without the need of traditional folders.",
          ],
        },
      ],
      features: [
        {
          title: "Save anything",
          desc: "Images, videos, notes, tweets, You name it.",
        },
        {
          title: "Ask Anything",
          desc: [
            '"What did I wrote last week?"',
            '"Did I saved any tweet of Elon last month?"',
            '"Why did she broke up with me?" (No, not even god can answer this)',
          ],
        },
        {
          title: "Don't worry, I don't track you. I swear.",
        },
        {
          title: "Get weekly summaries & recaps",
        },
        {
          title: "Multi model support (GPT, Claude, Gemini)",
        },
      ],
    },
    simplified: {
      heading: {
        text: ["Smart AI Visual Bookmarking.", "Simple & Powerful."],
      },
      blocks: [
        {
          text: [
            "Too many notes and bookmarks everywhere?",
            "This app helps organize everything in one place.",
          ],
        },
        // {
        //   text: [
        //     "It's not you, it's your tools.",
        //     "We built something better.",
        //   ],
        // },
        {
          text: ["Meet Beaconite."],
          className: "text-white",
        },
        {
          text: [
            "Your personalised visual bookmarking app. Find it instantly with AI.",
          ],
        },
      ],
      features: [
        {
          title: "Single Folder for Everything",
          desc: "",
        },
        {
          title: "AI-Powered Search",
        },
        {
          title: "Privacy First",
        },
        {
          title: "Smart Summaries",
        },
        {
          title: "Choice of AI Models",
        },
      ],
    },
  };

  const currentContent = isSimplified ? content.simplified : content.original;

  return (
    <section className="bg-background relative min-h-screen">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgb(64 64 64 / 0.03) 0%, rgb(0 0 0 / 0.1) 100%),
            linear-gradient(to right, rgb(64 64 64 / 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(64 64 64 / 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 40px 40px, 40px 40px",
          maskImage:
            "linear-gradient(to bottom, transparent, 5%, white, 95%, transparent)",
        }}
      />

      <div className="bg-background/70 relative z-10 mx-auto h-full min-h-screen max-w-3xl border-r border-l px-4 py-5 backdrop-blur-[2px] sm:p-6">
        <motion.div
          className="flex items-center justify-between"
          {...fadeInUp}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-xl font-semibold sm:text-2xl">Beaconite</h1>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isSimplified ? "simple-heading" : "original-heading"}
            className="pt-6 sm:pt-10"
            {...fadeInUp}
            transition={{ duration: 0.3, delay: staggerDelay }}
          >
            {currentContent.heading.text.map((line, index) => (
              <h1
                key={index}
                className="text-2xl font-semibold sm:text-3xl md:text-4xl"
              >
                {line}
              </h1>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-muted-foreground mt-8 space-y-4 text-base font-medium sm:mt-14 sm:space-y-6 sm:text-lg md:text-xl">
          <AnimatePresence mode="wait">
            {currentContent.blocks.map((block, blockIndex) => (
              <motion.div
                key={`${isSimplified ? "simple" : "original"}-block-${blockIndex}`}
                className={cn("space-y-1 sm:space-y-2", block.className)}
                {...fadeInUp}
                transition={{
                  duration: 0.3,
                  delay: (blockIndex + 2) * staggerDelay,
                }}
              >
                {block.text.map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={isSimplified ? "simple-features" : "original-features"}
            className="mt-6 sm:mt-10"
            {...fadeInUp}
            transition={{
              duration: 0.3,
              delay: (currentContent.blocks.length + 2) * staggerDelay,
            }}
          >
            <ul className="list-inside list-disc space-y-1 text-base font-medium sm:space-y-2 sm:text-lg">
              {currentContent.features.map((feature, index) => (
                <li key={index} className={index > 0 ? "mt-1 sm:mt-2" : ""}>
                  {feature.title}
                  {feature.desc && (
                    <p className="text-muted-foreground ml-4 text-sm sm:text-base">
                      {Array.isArray(feature.desc)
                        ? feature.desc.map((line, i) => (
                            <span key={i} className="block">
                              {line}
                            </span>
                          ))
                        : feature.desc}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-6 sm:mt-10"
          {...fadeInUp}
          transition={{
            duration: 0.3,
            delay: (currentContent.blocks.length + 3) * staggerDelay,
          }}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-1 border-b border-white pb-1 font-semibold text-white"
          >
            <span>
              {isSimplified
                ? "Just Sign Up"
                : "Your notes look messy, I can fix that."}
            </span>
            <motion.span
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>
      <motion.button
        onClick={() => setIsSimplified(!isSimplified)}
        className="bg-background/50 fixed bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/20 px-5 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-lg transition-colors hover:bg-black/30 sm:bottom-6 sm:px-8 sm:py-3 sm:text-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isSimplified ? "I can read" : "TL;DR"}
      </motion.button>
    </section>
  );
}
