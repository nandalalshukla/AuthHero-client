
import Link from "next/link";
import { AiOutlineCheckCircle, AiOutlineLock, AiOutlineApi, AiOutlineThunderbolt } from "react-icons/ai";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans dark:bg-zinc-950 pt-16">
      {/* Hero Section */}
      <main className="flex-1 w-full flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
        <div className="absolute top-0 -z-10 h-full w-full bg-white dark:bg-zinc-950">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(59,130,246,0.15)] opacity-50 blur-[80px]"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-6xl lg:text-7xl">
            The modern standard for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              authentication
            </span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            A complete authentication and authorization, user management solution for your next project. Secure, fast, and easy to integrate.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs"
              className="w-full sm:w-auto rounded-md bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Get Started
            </Link>
            <Link
              href="/docs/api-reference"
              className="w-full sm:w-auto rounded-md bg-white border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 px-8 py-3.5 text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
            >
              API Reference
            </Link>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-24 sm:py-32 border-t border-zinc-100 dark:border-zinc-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">Deploy faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
              Everything you need for user management
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: 'Secure by Default',
                  description: 'Best-in-class security practices built-in. Passwords hashed with secure algorithms, CSRF/XSS protection, and rate limiting out of the box.',
                  icon: AiOutlineLock,
                },
                {
                  name: 'Developer Friendly API',
                  description: 'Well-documented REST API that integrates seamlessly with your frontend. Built with TypeScript for excellent type safety and DX.',
                  icon: AiOutlineApi,
                },
                {
                  name: 'Lightning Fast',
                  description: 'Optimized response times with efficient database queries and caching strategies. Ensure your users never have to wait during authentication flows.',
                  icon: AiOutlineThunderbolt,
                },
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-zinc-900 dark:text-white">
                    <feature.icon className="h-6 w-6 flex-none text-blue-600 dark:text-blue-400" aria-hidden="true" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
