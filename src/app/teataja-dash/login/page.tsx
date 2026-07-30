import { login } from "./actions";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ e?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { e } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center px-5 py-16 bg-[var(--midnight)]">
      <div className="w-full max-w-sm">
        <p className="font-[family-name:var(--font-jetbrains-mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--mist)] mb-5">
          Teataja kaardistus
        </p>
        <h1 className="font-[family-name:var(--font-instrument-serif)] text-[34px] leading-[1.1] text-[var(--frost)] mb-8">
          Dashboard
        </h1>

        <form action={login} className="rounded-2xl border border-white/[0.07] bg-[var(--dark-surface)] p-6">
          <label
            htmlFor="password"
            className="block font-[family-name:var(--font-outfit)] text-xs font-medium text-white/45 mb-2"
          >
            Parool
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            className="w-full rounded-lg border border-white/[0.14] bg-[var(--midnight)] px-3 py-3 text-base text-[var(--frost)] outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--spruce-light)]"
          />

          {e ? (
            <p className="mt-4 text-sm text-[var(--amber-light)]">Vale parool.</p>
          ) : null}

          <button
            type="submit"
            className="mt-5 w-full rounded-lg bg-[var(--spruce)] px-5 py-3 font-[family-name:var(--font-outfit)] text-[15px] font-semibold text-white transition-colors hover:bg-[var(--spruce-light)] hover:text-[var(--midnight)]"
          >
            Logi sisse
          </button>
        </form>
      </div>
    </main>
  );
}
