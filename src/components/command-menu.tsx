"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { tags } from "~/config/tags";
import { useClickOutside } from "~/hooks/use-click-outside";
import { cn } from "~/lib/utils";

export function CommandMenu() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const commandRef = useRef(null);

  const query = searchParams.get("q");
  const selectedTags = query?.split("-").filter(Boolean) ?? [];

  const colors = selectedTags
    .map((tag) => {
      const color = tags.colors.find(
        (item) => item.title.toLowerCase() === tag.toLowerCase(),
      );
      return color ? { title: color.title, color: color.color } : null;
    })
    .filter((color) => color !== null) as {
    title: string;
    color: string;
  }[];

  const collections = selectedTags
    .filter((tag) =>
      tags.collections
        .map((collection) => collection.title.toLowerCase())
        .includes(tag.toLowerCase()),
    )
    .map((tag) => {
      const collection = tags.collections.find(
        (item) => item.title.toLowerCase() === tag.toLowerCase(),
      );
      return collection ? { title: collection.title } : null;
    })
    .filter((collection) => collection !== null) as {
    title: string;
    color: string;
  }[];

  useClickOutside({ ref: commandRef, handler: () => setOpen(false) });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  function onTagClick(tag: string) {
    const title = tag.toLowerCase();
    let newQuery: string;

    if (query?.includes(title)) {
      newQuery = query
        .replace(title, "")
        .replace(/--+/g, "-")
        .replace(/^-|-$/g, "")
        .trim();
    } else {
      const tags = query?.split("-").filter(Boolean) ?? [];
      tags.push(title);
      newQuery = tags.join("-");
    }

    runCommand(() => router.push(`/?q=${encodeURIComponent(newQuery)}`));
  }

  return (
    <>
      <div className="flex w-full items-center gap-2">
        <ScrollArea className="max-w-80 shrink-0">
          <div className="mr-2 flex gap-2 text-sm">
            {colors.map((item) => (
              <div
                key={item.color}
                className="relative flex items-center gap-2 rounded-full border bg-accent px-2 py-1 text-accent-foreground"
              >
                <div
                  className="size-4 rounded-full border"
                  style={{ backgroundColor: item.color }}
                />
                {item.title}
                <button
                  className="inline-flex h-full items-center border-l pl-1"
                  onClick={() => runCommand(() => onTagClick(item.title))}
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            ))}

            {collections.map((item) => (
              <div
                key={item.title}
                className="relative flex items-center gap-2 rounded-full border bg-accent px-2 py-1 capitalize text-accent-foreground"
              >
                {item.title}
                <button
                  className="inline-flex h-full items-center border-l pl-1"
                  onClick={() => runCommand(() => onTagClick(item.title))}
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <Button
          variant="outline"
          className={cn(
            "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12",
          )}
          onClick={() => setOpen(true)}
        >
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <span className="hidden lg:inline-flex">Search palettes...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        {!!query?.length && (
          <Link href="/">
            <X className="size-4" aria-hidden="true" />
            <span className="sr-only">Clear all</span>
          </Link>
        )}
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search palettes" />
        <CommandList
          className={cn(
            // absolute top-14
            "w-full rounded-b-lg border bg-white px-2 py-4 shadow-lg [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-1",
            // !open && "hidden",
          )}
        >
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Colors">
            <div className="flex flex-wrap gap-2">
              {tags.colors.map((item) => (
                <CommandItem
                  key={item.color}
                  value={item.title}
                  onSelect={() => onTagClick(item.title)}
                  onClick={() => onTagClick(item.title)}
                  className="relative cursor-pointer rounded-full border hover:bg-accent hover:text-accent-foreground"
                >
                  <div
                    className="mr-2 size-4 rounded-full border"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.title}
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
          <CommandSeparator className="my-6" />
          <CommandGroup heading="Collections">
            <div className="flex flex-wrap gap-2">
              {tags.collections.map((item) => (
                <CommandItem
                  key={item.title}
                  value={item.title}
                  onSelect={() => onTagClick(item.title)}
                  onClick={() => onTagClick(item.title)}
                  className="relative cursor-pointer rounded-full border hover:bg-accent hover:text-accent-foreground"
                >
                  {item.title}
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
