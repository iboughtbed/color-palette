import { ErrorCard } from "~/components/error-card";

export default function PaletteNotFound() {
  return (
    <>
      <div>
        <ErrorCard
          title="Palette not found"
          description="The palette may have been deleted"
          retryLink="/"
          retryLinkText="Go to Home"
        />
      </div>
    </>
  );
}
