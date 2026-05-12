export default function GalleryPage() {
  return (
    <main className="w-full pt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">
          Gallery
        </h1>
        <p className="text-lg text-black/60 font-light mb-12">
          Explore our latest collection through stunning photography and lifestyle imagery.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Placeholder gallery items */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-gray-100 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Gallery Image {i}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
