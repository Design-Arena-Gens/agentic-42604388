import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { BUSINESS_COPY } from "@/config/business";
import { cleanPlaceholder } from "@/lib/placeholders";

export default function MenuPage() {
  const heading = cleanPlaceholder(BUSINESS_COPY.menuHeading, BUSINESS_COPY.menuHeading);
  return (
    <div className="pb-24">
      <header className="space-y-2 pt-4">
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-400">
          {heading}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
          Discover the menu
        </h1>
        <p className="text-sm text-neutral-500">
          Scroll, search, and add to your pickup queue. Each dish showcases seasonal ingredients and refined technique.
        </p>
      </header>
      <MenuExplorer />
    </div>
  );
}
