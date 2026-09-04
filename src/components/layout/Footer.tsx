import Link from "next/link";
import { footerNav, site } from "@/content/site";
import { TextLink } from "@/components/ui/Button";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-1 bg-black">
      <div className="shell py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo className="text-white" />
            <p className="measure mt-5 text-body text-gray-3">{site.description}</p>
            <div className="mt-8">
              <TextLink href="/contact">Start a project</TextLink>
            </div>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className="lg:col-span-2">
              <h2 className="text-eyebrow uppercase text-gray-2">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-caption text-gray-3 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="text-eyebrow uppercase text-gray-2">Where we are</h2>
            <address className="mt-5 space-y-3 text-caption not-italic text-gray-3">
              <p>
                {site.address.street}
                <br />
                {site.address.locality}, {site.address.region}
              </p>
              <p>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors duration-200 hover:text-white"
                >
                  {site.email}
                </a>
              </p>
              <p className="text-gray-2">{site.timezone}</p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-gray-1 pt-8 text-caption text-gray-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalName}. Built in {site.address.locality}.
          </p>
          <p>{site.languages.join(" · ")}</p>
        </div>
      </div>
    </footer>
  );
}
