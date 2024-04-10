"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { kv } from "~/lib/kv";
import { palette } from "~/lib/kv/schema";
import { protectedAction } from "~/lib/safe-action";
import { generateId } from "~/lib/utils";

const createPaletteSchema = palette;

export const createPalette = protectedAction(
  createPaletteSchema,
  async (input) => {
    const id = generateId(20);

    await kv.json.set(`palette:${id}`, "$", input);
    await kv.set(`palette:${id}:likes`, 0);

    redirect(`/palette/${id}`);
  },
);

const likePaletteSchema = z.object({
  paletteId: z.string(),
});

export const likePalette = protectedAction(
  likePaletteSchema,
  async ({ paletteId }, { session }) => {
    const collection = session.user.collection;

    const palettes = collection.split(",").filter((id) => id !== "");
    const index = palettes.indexOf(paletteId);

    let likes: number;
    let hasLiked: boolean;

    if (index !== -1) {
      palettes.splice(index, 1);
      likes = await kv.decr(`palette:${paletteId}:likes`);
      hasLiked = false;
    } else {
      palettes.push(paletteId);
      likes = await kv.incr(`palette:${paletteId}:likes`);
      hasLiked = true;
    }

    await kv.set(`collection:user-${session.user.id}`, palettes.join(","));

    return { likes, hasLiked };
  },
);
