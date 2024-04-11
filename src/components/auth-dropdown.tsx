"use client";

import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import mortyAvatar from "public/avatars/morty.png";

import { Button, buttonVariants } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export function AuthDropdown({ user }: { user?: Session["user"] }) {
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              className="relative h-8 w-8 rounded-full p-0"
            >
              <Image alt="avatar" src={mortyAvatar} className="rounded-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/create">Create</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/collection">Collection</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/collection">Popular palettes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/collection">Random palettes</Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={(e) => {
                e.preventDefault();
                void signOut({
                  callbackUrl: "/signin",
                });
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href="/signin"
          className={buttonVariants({
            size: "sm",
            className: "rounded-lg",
          })}
        >
          Sign In
          <span className="sr-only">Sign In</span>
        </Link>
      )}
    </>
  );
}
