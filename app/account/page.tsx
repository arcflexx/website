export default function AccountPage() {
  return (
    <main className="w-full pt-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-28">
        <h1 className="text-5xl md:text-6xl font-bold text-black mb-10">
          Account
        </h1>
        
        <div className="bg-gray-50 p-14 md:p-16 rounded-2xl text-center">
          <p className="text-lg text-black/70 font-light mb-8 leading-relaxed max-w-xl mx-auto">
            Sign in to your Arcflex Athletics account to manage your orders, preferences, and account information.
          </p>
          
          <div className="space-y-6">
            <button className="w-full md:w-auto px-12 py-3 bg-black text-white font-semibold text-sm tracking-widest hover:bg-black/90 transition-all duration-300">
              SIGN IN
            </button>
            
            <p className="text-black/60 font-light">
              Don&apos;t have an account? <span className="text-black font-semibold cursor-pointer hover:underline">Create one</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
