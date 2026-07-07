import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default function Home() {
  // const products = listProducts();
  // const featuredProducts = listProducts({ featured: true });
  // const categories = getCategories();

  return (
    <main className="min-h-screen bg-[#f7f6f2] text-stone-950">

      <Navbar startTransparent={true} />

      <Hero videoURL="/fvid.mp4" />
        
      {/* <section id="categories" className="px-5 py-10 sm:px-8 lg:px-12">
        <h1 className="mb-6 text-3xl text-center tracking-tight sm:text-4xl font-extralight">Shop Categories</h1>
        <div className="grid gap-0 grid-cols-3">
            {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
            ))}
        </div>
      </section> */}

    </main>
  );
}
