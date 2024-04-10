"use client";

import { formatDistanceToNowStrict } from "date-fns";
import { type Session } from "next-auth";
import { useOptimisticAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { likePalette } from "~/actions/palette";
import { CopyButton } from "~/components/copy-button";
import { Icons } from "~/components/icons";
import { Button, buttonVariants } from "~/components/ui/button";
import { type Palette } from "~/lib/kv/schema";
import { absoluteUrl, cn } from "~/lib/utils";

interface PaletteCardProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: Session["user"];
  palette: Palette;
  paletteId: string;
  likes: number;
}

export function PaletteCard({
  user,
  palette,
  paletteId,
  likes,
  className,
  ...props
}: PaletteCardProps) {
  const router = useRouter();
  const [likesCount, setLikesCount] = useState(likes);
  const [hasLiked, setHasLiked] = useState(
    user?.collection.includes(paletteId),
  );

  const { execute, status, optimisticData } = useOptimisticAction(
    likePalette,
    { likes: likesCount, hasLiked },
    (state) => {
      if (hasLiked) {
        return { likes: state.likes - 1, hasLiked: false };
      } else {
        return { likes: state.likes + 1, hasLiked: true };
      }
    },
    {
      onSuccess: ({ likes, hasLiked }) => {
        setLikesCount(likes);
        setHasLiked(hasLiked);
      },
    },
  );

  return (
    <div className="flex h-full min-h-[400px] w-full flex-col gap-2">
      <div
        className={cn(
          "flex h-[400px] w-[400px] flex-col overflow-hidden rounded-lg",
          className,
        )}
        {...props}
      >
        <div
          className="group relative w-full basis-2/5"
          style={{ backgroundColor: palette.color1 }}
        >
          <CopyButton
            value={palette.color1}
            text={palette.color1}
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
                className:
                  "absolute bottom-0 left-0 rounded-none rounded-tr-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100",
              }),
            )}
          />
        </div>
        <div
          className="group relative w-full basis-[30%]"
          style={{ backgroundColor: palette.color2 }}
        >
          <CopyButton
            value={palette.color2}
            text={palette.color2}
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
                className:
                  "absolute bottom-0 left-0 rounded-none rounded-tr-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100",
              }),
            )}
          />
        </div>
        <div
          className="group relative w-full basis-1/5"
          style={{ backgroundColor: palette.color3 }}
        >
          <CopyButton
            value={palette.color1}
            text={palette.color1}
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
                className:
                  "absolute bottom-0 left-0 rounded-none rounded-tr-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100",
              }),
            )}
          />
        </div>
        <div
          className="group relative w-full basis-[10%]"
          style={{ backgroundColor: palette.color4 }}
        >
          <CopyButton
            value={palette.color1}
            text={palette.color1}
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
                className:
                  "absolute bottom-0 left-0 rounded-none rounded-tr-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100",
              }),
            )}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            className={cn(hasLiked && "bg-accent text-accent-foreground")}
            onClick={() => {
              if (user) {
                execute({ paletteId });
              } else {
                router.push("/signin");
              }
            }}
          >
            <Icons.heart
              className={cn("mr-2 size-4", hasLiked && "fill-black")}
            />
            {status === "executing" ? optimisticData.likes : likesCount}
            <span className="sr-only">like</span>
          </Button>
          <CopyButton value={absoluteUrl(`/palette/${paletteId}`)} />
          <Link
            href={`/create?from=${encodeURIComponent(`${palette.color1}-${palette.color2}-${palette.color3}-${palette.color4}`)}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
            )}
          >
            Edit
          </Link>
        </div>
        <p className="text-muted-foreground">
          {formatDistanceToNowStrict(palette.createdAt)}
        </p>
      </div>
    </div>
  );
}
