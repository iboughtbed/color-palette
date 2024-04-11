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
      <div className="flex flex-col justify-center px-5 py-6 md:items-center">
        <CreatePaletteForm colors={colors} />
      </div>
    </>
  );
}
