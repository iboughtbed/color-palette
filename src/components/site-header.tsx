import { type Session } from "next-auth";
import Link from "next/link";

import { AuthDropdown } from "~/components/auth-dropdown";
import { CommandMenu } from "~/components/command-menu";
import { Icons } from "~/components/icons";
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
            className="mr-2 flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
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
            <AuthDropdown user={user} />
          </nav>
        </div>
      </div>
    </header>
  );
}
