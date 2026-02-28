
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
          Welcome to AuthHero
        </h1>
        <p className="mt-6 text-2xl text-gray-600 dark:text-gray-300">
          The ultimate authentication solution for your applications.
        </p>
        <div className="mt-10 flex items-center space-x-4">
          <a
            href="/docs"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Get Started
          </a>
          <a
            href="/demo"
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
          >
            View Demo
          </a>
        </div>
      </main>
    </div>
  );
}
