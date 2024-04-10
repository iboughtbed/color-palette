import "server-only";

import { kv } from "~/lib/kv";
import { type Palette } from "~/lib/kv/schema";

export async function getPalettes() {
  const keys = await kv.keys("palette:*");

  const palettes: (Palette & { id: string; likes: number })[] = [];

  for (const key of keys) {
    const id = key.split(":")[1];

    const palette = await kv.json.get<Palette>(key);
    const likes = await kv.get<number>(`likes:${id}`);

    if (palette) {
      palettes.push({
        ...palette,
        id: id ?? key,
        likes: likes ?? 0,
      });
    }
  }

  return { palettes };
}
