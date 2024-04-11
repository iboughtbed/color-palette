import { getServerAuthSession } from "~/lib/auth";
import { getPalettes } from "~/lib/queries/palette";
import { PaletteList } from "./_components/palette-list";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const session = await getServerAuthSession();

  const q = searchParams.q as string;
  const tags = q?.split("-").filter(Boolean) ?? [];

  const { palettes } = await getPalettes({ tags });

  return (
    <>
      <div className="flex flex-col px-5">
        <PaletteList
          palettes={palettes}
          collection={session?.user.collection}
        />
      </div>
    </>
  );
}
