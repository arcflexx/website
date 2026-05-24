import { getSiteContent } from '@/lib/cds';

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <main className="w-full pt-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-28">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-10">
          {content.about.heading}
        </h1>

        <div className="space-y-10 text-lg text-black/70 font-light leading-relaxed">
          {content.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <h2 className="text-3xl font-bold text-black mt-14 mb-6">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-10">
            {content.about.values.map((value) => (
              <div key={value.title}>
                <h3 className="text-xl font-semibold text-black mb-3">{value.title}</h3>
                <p className="leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>

          <p className="leading-relaxed">{content.about.closing}</p>
        </div>
      </div>
    </main>
  );
}
