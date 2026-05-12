export default function AboutPage() {
  return (
    <main className="w-full pt-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-8">
          About Arcflex Athletics
        </h1>
        
        <div className="space-y-8 text-lg text-black/70 font-light leading-relaxed">
          <p>
            Arcflex Athletics is dedicated to creating premium athletic performance wear that combines innovation, quality, and style. Our mission is to empower athletes and fitness enthusiasts with apparel designed for excellence.
          </p>
          
          <p>
            Founded on the principles of performance and sustainability, we craft each piece with meticulous attention to detail. Our team works tirelessly to deliver products that exceed expectations and inspire confidence in every wear.
          </p>
          
          <h2 className="text-3xl font-bold text-black mt-12 mb-4">
            Our Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">Quality</h3>
              <p>We use only the finest materials and construction methods to ensure durability and comfort.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">Innovation</h3>
              <p>Continuously pushing boundaries to create cutting-edge athletic wear solutions.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">Sustainability</h3>
              <p>Committed to environmentally responsible practices throughout our supply chain.</p>
            </div>
          </div>
          
          <p>
            Whether you're training for your next event or simply living an active lifestyle, Arcflex Athletics has the performance wear you need to succeed.
          </p>
        </div>
      </div>
    </main>
  );
}
