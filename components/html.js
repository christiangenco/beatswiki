export function P({ children }) {
  return <p className="mb-2 text-lg">{children}</p>;
}

export function Highlight({ children }) {
  return <span className="rounded p-1 bg-yellow-100">{children}</span>;
}

export function Showcase({ children }) {
  return (
    <div className="text-4xl md:text-6xl font-bold text-center font-mono">
      {children}
    </div>
  );
}
