import { SiteHeader } from "~/components/site-header";
import { getServerAuthSession } from "~/lib/auth";

interface CreatePaletteLayoutProps {
  children: React.ReactNode;
}

export default async function CreatePaletteLayout({
  children,
}: CreatePaletteLayoutProps) {
  const session = await getServerAuthSession();

  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader user={session?.user} showCommandMenu={false} />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
