import EditableText from "./EditableText";

export default function Shell({ children, title, onChange }) {
  return (
    <div className="bg-red-900 min-h-screen">
      <div className="pb-32">
        <header className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="w-full text-4xl lg:text-6xl font-bold text-white bg-transparent">
              {title}
            </h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
