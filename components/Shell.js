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
          <a
            href="https://twitter.com/cgenco?ref_src=twsrc%5Etfw"
            className="twitter-follow-button mt-2"
            data-show-count="false"
            data-size="large"
            data-show-screen-name="true"
          >
            Follow @cgenco
          </a>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
          ></script>
        </div>
      </main>
    </div>
  );
}
