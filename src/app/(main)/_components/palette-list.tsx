"use client";

import { formatDistanceToNowStrict } from "date-fns";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { likePalette } from "~/actions/palette";
import { CopyButton } from "~/components/copy-button";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import type { Palette } from "~/lib/kv/schema";
import { cn } from "~/lib/utils";

type PaletteWithId = Palette & { id: string };

interface PaletteListProps {
  palettes: PaletteWithId[];
  collection?: string;
}

export function PaletteList({ palettes, collection }: PaletteListProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {palettes.map((palette) => (
        <PaletteItem
          key={palette.id}
          palette={palette}
          collection={collection}
        />
      ))}
    </div>
  );
}

interface PaletteItemProps {
  palette: PaletteWithId;
  collection?: string;
}

function PaletteItem({ palette, collection }: PaletteItemProps) {
  const router = useRouter();
  // const pathname = usePathname();

  const [likesCount, setLikesCount] = useState(palette.likes);
  const [hasLiked, setHasLiked] = useState(collection?.includes(palette.id));

  const { execute } = useAction(likePalette, {
    onSuccess: ({ likes, hasLiked }) => {
      setLikesCount(likes);
      setHasLiked(hasLiked);
    },
  });

  return (
    <div className="relative">
      <div className="relative flex aspect-square w-full flex-col overflow-hidden rounded-lg">
        <Link
          href={`/palette/${palette.id}`}
          className="absolute inset-0 z-[2]"
        />
        <div
          className="group relative w-full basis-[40%]"
          style={{ backgroundColor: palette.color1 }}
        >
          <CopyButton
            value={palette.color1}
            text={palette.color1}
            className="absolute bottom-0 left-0 rounded-none rounded-tr-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
        <div
          className="group relative w-full basis-[30%]"
          style={{ backgroundColor: palette.color2 }}
        >
          <CopyButton
            value={palette.color2}
            text={palette.color2}
            className="absolute bottom-0 left-0 rounded-none rounded-tr-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
        <div
          className="group relative w-full basis-[15%]"
          style={{ backgroundColor: palette.color3 }}
        >
          <CopyButton
            value={palette.color3}
            text={palette.color3}
            className="absolute bottom-0 left-0 rounded-none rounded-tr-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
        <div
          className="group relative w-full basis-[15%]"
          style={{ backgroundColor: palette.color4 }}
        >
          <CopyButton
            value={palette.color4}
            text={palette.color4}
            className="absolute bottom-0 left-0 rounded-none rounded-tr-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => execute({ paletteId: palette.id })}
          >
            <Icons.heart
              className={cn("mr-2 size-4", hasLiked && "fill-black")}
            />
            {likesCount}
          </Button>
          {/* <CopyButton value={absoluteUrl(pathname)} text="Link" /> */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const searchParams = `${palette.color1}-${palette.color2}-${palette.color3}-${palette.color4}`;
              router.push(`/create?from=${encodeURIComponent(searchParams)}`);
            }}
          >
            Edit
          </Button>
        </div>
        <p className="text-sm">
          {formatDistanceToNowStrict(palette.createdAt)}
        </p>
      </div>
    </div>
  );
}
