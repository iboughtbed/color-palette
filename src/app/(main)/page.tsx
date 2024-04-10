import { PaletteList } from "./_components/palette-list";

export default async function HomePage() {
  return (
    <>
      <div className="flex flex-col px-5">
        <PaletteList />
      </div>
    </>
  );
}
