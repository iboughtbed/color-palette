import Link from "next/link";

import { CommandMenu } from "~/components/command-menu";
import { Icons } from "~/components/icons";
import { siteConfig } from "~/config/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-14 max-w-screen-2xl">
        <div className="mr-4 flex">
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
            <CommandMenu />
          </div>
          <nav className="flex min-w-80 items-center"></nav>
        </div>
      </div>
    </header>
  );
}
