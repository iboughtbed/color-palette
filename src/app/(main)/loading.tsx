import { Skeleton } from "~/components/ui/skeleton";

export default function PalettesLoading() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="relative">
          <Skeleton className="relative flex aspect-square w-full flex-col overflow-hidden rounded-lg" />
        </div>
      ))}
    </div>
  );
}
