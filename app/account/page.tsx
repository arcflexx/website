import PageShell from '../components/PageShell';

export default function AccountPage() {
  return (
    <PageShell title="Account" widthClassName="max-w-3xl" contentClassName="mt-10">
      <div className="border border-black/10 p-8 text-center md:p-12">
        <p className="mx-auto mb-8 max-w-xl text-lg font-light leading-relaxed text-black/70">
          Sign in to your Arcflex Athletics account to manage your orders, preferences, and account information.
        </p>

        <div className="space-y-6">
          <button className="w-full bg-black px-12 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-black/85 md:w-auto">
            SIGN IN
          </button>

          <p className="font-light text-black/60">
            Don&apos;t have an account? <span className="text-black font-semibold cursor-pointer hover:underline">Create one</span>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
