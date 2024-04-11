import { notFound } from "next/navigation";

import { getServerAuthSession } from "~/lib/auth";
import { kv } from "~/lib/kv";
import { type Palette } from "~/lib/kv/schema";
import { PaletteCard } from "../../_components/palette-card";

export default async function PalettePage({
  params,
}: {
  params: { paletteId: string };
}) {
  const palette = await kv.json.get<Palette>(`palette:${params.paletteId}`);

  if (!palette) {
    notFound();
  }

  const session = await getServerAuthSession();

  return (
    <>
      <div>
        <p className="text-center text-sm">
          Hover over the color to see the value
        </p>
        <div className="mx-auto mt-4 max-w-96">
          <PaletteCard
            palette={palette}
            paletteId={params.paletteId}
            collection={session?.user.collection}
          />
        </div>
      </div>
    </>
  );
}
