import { type Session } from "next-auth";

import { type Palette } from "~/lib/kv/schema";
import { PaletteCard } from "./palette-card";

interface PaletteListProps {
  palettes: (Palette & { id: string; likes: number })[];
  user?: Session["user"];
}

export function PaletteList({ palettes, user }: PaletteListProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
      {palettes.map((palette) => (
        <PaletteCard
          key={palette.id}
          palette={palette}
          paletteId={palette.id}
          user={user}
          likes={palette.likes}
          className="aspect-square h-[300px] w-[300px]"
        />
      ))}
    </div>
  );
}
