"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createPalette } from "~/actions/palette";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const formSchema = z.object({
  color1: z.string(),
  color2: z.string(),
  color3: z.string(),
  color4: z.string(),
  tags: z.string().regex(/[^,\s][^\,]*[^,\s]*/),
});

type FormData = z.infer<typeof formSchema>;

export function CreatePaletteForm({ colors }: { colors: string[] }) {
  const { execute, status } = useAction(createPalette, {
    onSuccess: () => {
      toast.success("Successfully created a palette");
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color1: colors[0] ?? "#bbbbbb",
      color2: colors[1] ?? "#cccccc",
      color3: colors[2] ?? "#dddddd",
      color4: colors[3] ?? "#eeeeee",
      tags: "",
    },
  });

  function onSubmit(data: FormData) {
    execute({ ...data });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex h-[400px] w-[400px] flex-col overflow-hidden rounded-lg">
          <FormField
            control={form.control}
            name="color1"
            render={({ field }) => (
              <FormItem className="basis-2/5">
                <FormControl>
                  <input
                    type="color"
                    className="h-full w-full cursor-pointer"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color2"
            render={({ field }) => (
              <FormItem className="basis-[30%]">
                <FormControl>
                  <input
                    type="color"
                    className="h-full w-full cursor-pointer"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color3"
            render={({ field }) => (
              <FormItem className="basis-1/5">
                <FormControl>
                  <input
                    type="color"
                    className="h-full w-full cursor-pointer"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="color4"
            render={({ field }) => (
              <FormItem className="basis-[10%]">
                <FormControl>
                  <input
                    type="color"
                    className="h-full w-full cursor-pointer"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormDescription>
                Add tag names separated by comma.
              </FormDescription>
              <FormControl>
                <Input placeholder="Add tags" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="outline"
          className="w-full"
          disabled={status === "executing"}
        >
          Submit palette
        </Button>
      </form>
    </Form>
  );
}
