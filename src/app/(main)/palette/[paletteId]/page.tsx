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
  const likes = await kv.get<number>(`likes:${params.paletteId}`);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm">Hover over the color to see the value</p>
        <PaletteCard
          user={session?.user}
          palette={palette}
          paletteId={params.paletteId}
          likes={likes ?? 0}
        />
      </div>
    </>
  );
}
