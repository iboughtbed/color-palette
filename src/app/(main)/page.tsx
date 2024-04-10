import { getServerAuthSession } from "~/lib/auth";
import { getPalettes } from "~/lib/queries/palette";
import { PaletteList } from "./_components/palette-list";

export default async function HomePage() {
  const session = await getServerAuthSession();

  const { palettes } = await getPalettes();

  return (
    <>
      <div className="flex flex-col px-5">
        <PaletteList user={session?.user} palettes={palettes} />
      </div>
    </>
  );
}
