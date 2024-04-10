import { CreatePaletteForm } from "../_components/create-palette-form";

export default function CreatePalettePage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const from = searchParams.from as string;

  const colors = from?.split("-");
  const [color1, color2, color3, color4] = colors.slice(0, 4);

  return (
    <>
      <div className="flex flex-col items-center justify-center py-6">
        <CreatePaletteForm
          color1={color1}
          color2={color2}
          color3={color3}
          color4={color4}
        />
      </div>
    </>
  );
}
