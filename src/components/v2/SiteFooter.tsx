import { Link } from "@/i18n/navigation";
import type { SiteText } from "@/content/v2/text";
import { Forest, SleepingFox } from "./Art";
import { BookLink } from "./BookLink";
import { JoinTeamLink, Newsletter } from "./Forms";

/** Footer column "What we do"; the rest of the menu sits under "Company". */
const OFFER = ["services", "work", "products"] as const;

export function SiteFooter({ t }: { t: SiteText }) {
  const f = t.footer;
  return (
    <>
      {/* A pale forest that fades into the white footer, with the fox asleep in the clearing. */}
      <div className="forest" aria-hidden="true">
        <Forest
          height={150}
          ground="#FFFFFF"
          rows={[
            { seed: 11, color: "#E2E7E1", min: 40, max: 96, base: 6, step: [10, 16] },
            { seed: 23, color: "#ECEFEA", min: 28, max: 66, base: 5, step: [11, 18], gap: [0.06, 0.12] },
            { seed: 37, color: "#FFFFFF", min: 20, max: 50, base: 4, step: [8, 15], gap: [0.05, 0.13] },
          ]}
        />
        <SleepingFox />
      </div>
      <footer>
        <div className="wrap inner">
          <div className="fgrid">
            <div className="about">
              <Link className="brand" href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/fox.png" alt="" />
                Alopex Digital
              </Link>
              <p>{f.about}</p>
              <Newsletter text={f.newsletter} />
            </div>
            <div>
              <h4>{f.offer}</h4>
              <ul>
                {OFFER.map((key) => (
                  <li key={key}><Link href={`/${key}`}>{t.menu[key]}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4>{f.company}</h4>
              <ul>
                <li><Link href="/about">{t.menu.about}</Link></li>
                <li><Link href="/process">{t.menu.process}</Link></li>
                <li><Link href="/contact">{t.menu.contact}</Link></li>
                <li><JoinTeamLink label={f.joinTeam} closeLabel={t.ui.close} text={t.about.join} /></li>
              </ul>
            </div>
            <div>
              <h4>{f.start}</h4>
              <ul>
                <li><BookLink className="">{t.ui.book30}</BookLink></li>
                <li><Link href="/health-check">{f.check}</Link></li>
                <li><a href="mailto:info@alopex.digital">info@alopex.digital</a></li>
                <li><a href="tel:+37257800857">+372 5780 0857</a></li>
              </ul>
            </div>
            <div>
              <h4>{f.follow}</h4>
              <ul>
                <li><a href="https://www.linkedin.com/company/alopex-digital" target="_blank" rel="noopener">LinkedIn</a></li>
                <li><a href="https://www.instagram.com/alopex.digital/" target="_blank" rel="noopener">Instagram</a></li>
                <li><a href="https://www.facebook.com/alopexdigital" target="_blank" rel="noopener">Facebook</a></li>
              </ul>
            </div>
          </div>
          <div className="fbase">
            <span>{f.base}</span>
            <span className="legal-links">
              <Link href="/privacy-policy">{f.privacy}</Link>
              <Link href="/terms">{f.terms}</Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
