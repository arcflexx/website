import PageShell from '../components/PageShell';
import { getSiteContent } from '@/lib/cds';

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <PageShell
      title={content.about.heading}
      widthClassName="max-w-6xl"
      contentClassName="mt-12"
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-7 text-lg font-light leading-relaxed text-black/70">
          {content.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p>{content.about.closing}</p>
        </div>

        <div className="border-y border-black/10">
          <h2 className="border-b border-black/10 py-5 text-2xl font-bold text-black">Our Values</h2>
          <div className="divide-y divide-black/10">
            {content.about.values.map((value) => (
              <div key={value.title} className="py-7">
                <h3 className="mb-3 text-xl font-semibold text-black">{value.title}</h3>
                <p className="font-light leading-relaxed text-black/65">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
