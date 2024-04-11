import { type Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

import mortyAvatar from "public/avatars/morty.png";

import { CommandMenu } from "~/components/command-menu";
import { Icons } from "~/components/icons";
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
import { siteConfig } from "~/config/site";

interface SiteHeaderProps {
  user?: Session["user"];
  showCommandMenu?: boolean;
}

export function SiteHeader({ user, showCommandMenu = true }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-14 px-8">
        <div className="flex md:mr-4">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            <Icons.logo className="size-6 text-blue-600" />
            <span className="hidden font-bold sm:inline-block">
              {siteConfig.name}
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className="w-full flex-1">
            {showCommandMenu && <CommandMenu />}
          </div>
          <nav className="flex items-center justify-end md:min-w-40 xl:min-w-80">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="relative h-8 w-8 rounded-full p-0"
                  >
                    <Image
                      alt="avatar"
                      src={mortyAvatar}
                      className="rounded-full"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/create">
                        {/* <DashboardIcon
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        /> */}
                        Create
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/collection">
                        {/* <GearIcon className="mr-2 h-4 w-4" aria-hidden="true" /> */}
                        Collection
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/collection">
                        {/* <GearIcon className="mr-2 h-4 w-4" aria-hidden="true" /> */}
                        Popular palettes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/collection">
                        {/* <GearIcon className="mr-2 h-4 w-4" aria-hidden="true" /> */}
                        Random palettes
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/signout">
                      {/* <ExitIcon className="mr-2 h-4 w-4" aria-hidden="true" /> */}
                      Log out
                    </Link>
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
          </nav>
        </div>
      </div>
    </header>
  );
}
