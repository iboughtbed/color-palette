import "server-only";

import { getServerAuthSession } from "~/lib/auth";
import { kv } from "~/lib/kv";
import type { Palette, PaletteWithId } from "~/lib/kv/schema";

export async function getPalettes({ tags }: { tags: string[] }) {
  const keys = await kv.keys("palette:*");

  const palettes: PaletteWithId[] = [];

  for (const key of keys) {
    const id = key.split(":")[1];

    const palette = await kv.json.get<Palette>(key);

    if (palette && tags.every((tag) => palette.tags.includes(tag))) {
      palettes.push({
        ...palette,
        id: id ?? key,
      });
    }
  }

  return { palettes };
}

export async function getCollection() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    throw new Error("Unauthenticated");
  }

  const palettes: PaletteWithId[] = [];
  const collection = (
    (await kv.get<string>(`collection:user-${session.user.id}`)) ?? ""
  )
    .split(",")
    .filter((id) => id !== "");

  for (const key of collection) {
    const palette = await kv.json.get<Palette>(`palette:${key}`);
    if (palette) {
      palettes.push({ ...palette, id: key });
    }
  }

  return { palettes };
}
