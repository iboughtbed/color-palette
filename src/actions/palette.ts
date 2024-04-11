"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { kv } from "~/lib/kv";
import { palette, type Palette } from "~/lib/kv/schema";
import { protectedAction } from "~/lib/safe-action";
import { generateId } from "~/lib/utils";

const createPaletteSchema = palette.omit({ createdAt: true });

export const createPalette = protectedAction(
  createPaletteSchema,
  async (input) => {
    const id = generateId(20);

    await kv.json.set(`palette:${id}`, "$", {
      ...input,
      createdAt: new Date(),
    });

    redirect(`/palette/${id}`);
  },
);

const likePaletteSchema = z.object({
  paletteId: z.string(),
});

export const likePalette = protectedAction(
  likePaletteSchema,
  async ({ paletteId }, { session }) => {
    const palette = await kv.json.get<Palette>(`palette:${paletteId}`);

    if (!palette) return { likes: 0, hasLiked: false };

    const collection = session.user.collection;

    const palettes = collection.split(",").filter((id) => id !== "");
    const index = palettes.indexOf(paletteId);

    let likes: number;
    let hasLiked: boolean;

    if (index !== -1) {
      palettes.splice(index, 1);
      await kv.json.set(`palette:${paletteId}`, "$", {
        ...palette,
        likes: palette.likes - 1,
      });

      likes = palette.likes - 1;
      hasLiked = false;
    } else {
      palettes.push(paletteId);
      await kv.json.set(`palette:${paletteId}`, "$", {
        ...palette,
        likes: palette.likes + 1,
      });

      likes = palette.likes + 1;
      hasLiked = true;
    }

    await kv.set(`collection:user-${session.user.id}`, palettes.join(","));

    return { likes, hasLiked };
  },
);
