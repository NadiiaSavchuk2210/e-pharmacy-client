type LegalSection = {
  title: string;
  paragraphs?: readonly string[];
  items?: readonly string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly LegalSection[];
};

const LegalPage = ({
  eyebrow,
  title,
  description,
  sections,
}: LegalPageProps) => {
  return (
    <article className="bg-bg">
      <header className="border-b border-border-subtle bg-surface-muted">
        <div className="container py-space-40 md:py-space-60">
          <p className="mb-space-12 text-14 font-semibold uppercase leading-18 text-accent">
            {eyebrow}
          </p>
          <h1 className="mb-space-16 max-w-[760px] text-36 font-semibold leading-50 text-text md:text-48 md:leading-60">
            {title}
          </h1>
          <p className="max-w-[720px] text-16 leading-22 text-text-muted md:text-18 md:leading-28">
            {description}
          </p>
        </div>
      </header>

      <div className="container py-space-40 md:py-space-60">
        <div className="max-w-[780px] space-y-space-32">
          {sections.map(({ title: sectionTitle, paragraphs, items }) => (
            <section key={sectionTitle} className="space-y-space-12">
              <h2 className="text-24 font-semibold leading-34 text-text">
                {sectionTitle}
              </h2>

              {paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-16 leading-22 text-text-muted"
                >
                  {paragraph}
                </p>
              ))}

              {items ? (
                <ul className="list-disc space-y-space-8 pl-space-20 text-16 leading-22 text-text-muted">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
};

export default LegalPage;
