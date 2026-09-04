import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="min-h-svh">
      <PageHeader
        eyebrow="404"
        title={["That page", "is not here."]}
        lede="It may have moved, or the link may have a typo in it. The work and the plans are both one click away."
      />
      <div className="shell flex flex-wrap gap-4 pb-[var(--section-y)]">
        <ButtonLink href="/">Back to the start</ButtonLink>
        <ButtonLink href="/work" variant="ghost" magnetic={false}>
          See the work
        </ButtonLink>
      </div>
    </div>
  );
}
