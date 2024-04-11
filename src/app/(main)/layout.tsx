import { SidebarNav } from "~/components/sidebar-nav";
import { SiteHeader } from "~/components/site-header";
import { ScrollArea } from "~/components/ui/scroll-area";
import { getServerAuthSession } from "~/lib/auth";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const session = await getServerAuthSession();

  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader user={session?.user} />
        <div className="flex flex-1 px-8">
          <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem-1px)] shrink-0 overflow-y-auto md:sticky md:block">
            <ScrollArea className="py-6 pr-6 lg:py-8">
              <SidebarNav />
            </ScrollArea>
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden py-6 lg:py-8">
            {children}
          </main>
          <div className="hidden min-w-80 max-w-80 px-5 py-6 lg:py-8 xl:block">
            <div>
              <h1 className="text-lg font-medium">
                Color Palettes for Designers and Artists
              </h1>
              <h2 className="mt-1 text-sm text-muted-foreground">
                Discover the newest hand-picked palettes
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
