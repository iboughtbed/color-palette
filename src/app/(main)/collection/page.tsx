import { redirect } from "next/navigation";

import { getServerAuthSession } from "~/lib/auth";
import { getCollection } from "~/lib/queries/palette";
import { PaletteList } from "../_components/palette-list";

export default async function CollectionPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/signin");
  }

  const { palettes } = await getCollection();

  return (
    <>
      <div className="flex flex-col px-5">
        {!!palettes?.length ? (
          <PaletteList
            palettes={palettes}
            collection={session?.user.collection}
          />
        ) : (
          <p>No palettes in collection</p>
        )}
      </div>
    </>
  );
}
