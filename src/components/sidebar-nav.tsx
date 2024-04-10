"use client";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "~/components/icons";
import { cn } from "~/lib/utils";
import type { NavItems } from "~/types";

export function SidebarNav() {
  const pathname = usePathname();

  const items: NavItems = [
    { title: "New", href: "/", icon: "sparkle" },
    { title: "Popular", href: "/popular", icon: "flame" },
    { title: "Random", href: "/random", icon: "shell" },
    { title: "Collection", href: "/collection", icon: "heart" },
  ];

  return (
    <div className="flex w-full flex-col gap-2 p-1">
      {items.map((item, index) => {
        const Icon = item.icon ? Icons[item.icon] : ChevronLeftIcon;

        return item.href ? (
          <Link aria-label={item.title} key={index} href={item.href}>
            <span
              className={cn(
                "group flex w-full items-center rounded-lg border border-transparent py-1 pl-2 pr-6 text-lg hover:bg-muted hover:text-foreground",
                item.href === pathname
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Icon
                className={cn(
                  "mr-2 size-6",
                  item.href === pathname && "fill-black",
                )}
                aria-hidden="true"
              />
              <span>{item.title}</span>
            </span>
          </Link>
        ) : (
          <span
            key={index}
            className="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
          >
            {item.title}
          </span>
        );
      })}
    </div>
  );
}
