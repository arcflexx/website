import type { ReactNode } from 'react';

type PageShellProps = {
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  widthClassName?: string;
};

export default function PageShell({
  title,
  description,
  children,
  className = '',
  contentClassName = '',
  widthClassName = 'max-w-7xl',
}: PageShellProps) {
  return (
    <main className={`w-full pt-28 ${className}`.trim()}>
      <div className={`mx-auto px-5 py-16 sm:px-8 md:px-12 md:py-20 ${widthClassName}`.trim()}>
        <header className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-5">{title}</h1>
          {description ? (
            <p className="text-lg text-black/60 font-light leading-relaxed max-w-2xl">
              {description}
            </p>
          ) : null}
        </header>

        {children ? <div className={contentClassName}>{children}</div> : null}
      </div>
    </main>
  );
}
