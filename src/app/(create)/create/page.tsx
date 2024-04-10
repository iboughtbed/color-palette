import { CreatePaletteForm } from "../_components/create-palette-form";

export default function CreatePalettePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const from = searchParams.from as string;
  const colors = from?.split("-") ?? [];

  return (
    <>
      <div className="flex flex-col items-center justify-center py-6">
        <CreatePaletteForm colors={colors} />
      </div>
    </>
  );
}
