"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import { tags, type Tags } from "~/config/tags";
import { useClickOutside } from "~/hooks/use-click-outside";
import { cn } from "~/lib/utils";

export function CommandMenu() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const commandRef = useRef(null);

  const [selectedColors, setSelectedColors] = useState<Tags["colors"]>([]);
  const [selectedCollections, setSelectedCollections] = useState<
    Tags["collections"]
  >([]);

  const query = searchParams.get("q");
  const queryTags = useMemo(
    () => query?.split("-").filter(Boolean) ?? [],
    [query],
  );

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

  useEffect(() => {
    if (query) {
      const colors = queryTags
        .map((tag) => {
          const color = tags.colors.find(
            (item) => item.title.toLowerCase() === tag.toLowerCase(),
          );
          return color ? { title: color.title, color: color.color } : null;
        })
        .filter((color) => color !== null) as Tags["colors"];

      const collections = queryTags.filter((tag) =>
        tags.collections.some(
          (collection) => tag.toLowerCase() === collection.toLowerCase(),
        ),
      );

      setSelectedColors(colors);
      setSelectedCollections(collections);
    }
  }, [query, queryTags]);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
    setValue("");
  }, []);

  function handleClear() {
    setOpen(false);
    setSelectedColors([]);
    setSelectedCollections([]);
  }

  function handleRemove(item: string) {
    const newQuery = query
      ?.split("-")
      .filter((tag) => tag.toLocaleLowerCase() !== item.toLowerCase())
      .join("-");

    handleClear();

    router.push(`/?q=${encodeURIComponent(newQuery ?? "")}`);
  }

  return (
    <>
      <Command
        ref={commandRef}
        value={value}
        className="relative z-50 h-14 justify-center"
      >
        <div className="flex w-full">
          <CommandInput
            placeholder="Search palettes"
            className="w-full"
            value={value}
            onValueChange={(value) => setValue(value)}
            onFocus={() => setOpen(true)}
            onKeyUp={() => setOpen(true)}
            colors={selectedColors}
            collections={selectedCollections}
            onClear={handleClear}
            onRemove={handleRemove}
          />
        </div>
        <CommandList
          className={cn(
            "absolute top-14 z-[60] w-full rounded-b-lg border bg-white px-6 py-4 shadow-lg",
            !open && "hidden",
          )}
        >
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Colors" className="[&_[cmdk-item]]:py-1">
            <div className="flex flex-wrap gap-2">
              {tags.colors.map((item) => (
                <CommandItem
                  key={item.color}
                  value={item.title}
                  onSelect={() => {
                    const title = item.title.toLowerCase();
                    let newQuery: string;

                    if (query?.includes(title)) {
                      newQuery = query
                        .replace(title, "")
                        .replace(/--+/g, "-")
                        .replace(/^-|-$/g, "")
                        .trim();
                    } else {
                      const colors = query?.split("-").filter(Boolean) ?? [];
                      colors.push(title);
                      newQuery = colors.join("-");
                    }

                    runCommand(() =>
                      router.push(`/?q=${encodeURIComponent(newQuery)}`),
                    );
                  }}
                  className="rounded-full border"
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
          <CommandGroup heading="Collections" className="[&_[cmdk-item]]:py-1">
            <div className="flex flex-wrap gap-2">
              {tags.collections.map((item) => (
                <CommandItem
                  key={item}
                  value={item}
                  onSelect={() => {
                    const title = item.toLowerCase();
                    let newQuery: string;

                    if (query?.includes(title)) {
                      newQuery = query
                        .replace(title, "")
                        .replace(/--+/g, "-")
                        .replace(/^-|-$/g, "")
                        .trim();
                    } else {
                      const collections =
                        query?.split("-").filter(Boolean) ?? [];
                      collections.push(title);
                      newQuery = collections.join("-");
                    }

                    runCommand(() =>
                      router.push(`/?q=${encodeURIComponent(newQuery)}`),
                    );
                  }}
                  className="rounded-full border hover:bg-accent"
                >
                  {item}
                </CommandItem>
              ))}
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
    </>
  );
}
