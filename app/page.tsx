export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl font-semibold text-gray-800">
        Local business demo sites
      </h1>
      <p className="mt-2 max-w-md text-gray-500">
        Preview sites live at /demo/[slug] -- there&apos;s nothing to see at
        this root URL.
      </p>
    </div>
  );
}
