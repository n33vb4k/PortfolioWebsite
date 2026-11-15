import { credentials, education, toolkit } from '../lib/content'

export default function Background() {
  return (
    <section id="background" data-tone="#E1E6EE" className="gutter py-24 md:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <h2 className="t-title lg:col-span-4">Background</h2>
        <div className="lg:col-span-7 lg:col-start-6">
          <h3 className="font-semibold">Education</h3>
          <p className="mt-5">{education.degree}</p>
          <p className="t-small text-slate">{education.school}</p>
          <p className="mt-3 max-w-[60ch] text-slate">{education.detail}</p>
          <p className="mt-1 max-w-[60ch] text-slate">{education.school2}</p>

          <h3 className="mt-16 font-semibold md:mt-20">Tools I use most</h3>
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {toolkit.map((group) => (
              <div key={group.name}>
                <h4 className="t-small text-slate">{group.name}</h4>
                <ul className="mt-2 space-y-0.5">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="mt-16 font-semibold md:mt-20">Certifications</h3>
          <ul className="mt-5 space-y-4">
            {credentials.map((c) => (
              <li key={c.title} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6">
                <span>
                  {c.title}
                  <span className="block t-small text-slate">
                    {c.issuer}, {c.year}
                  </span>
                </span>
                {c.link && (
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-rest t-small font-medium text-cobalt"
                    aria-label={`Verify ${c.title}`}
                  >
                    Verify
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
