import { Skeleton } from "~/components/ui/skeleton";

export default function PaletteLoading() {
  return (
    <div className="relative">
      <div className="mx-auto mt-4 max-w-96">
        <Skeleton className="relative flex aspect-square w-full flex-col overflow-hidden rounded-lg" />
      </div>
    </div>
  );
}
