import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../hook/useAuth";

export default function Login() {
    const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(form);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-neutral-950 lg:flex">
      {/* Brand panel — desktop only */}
      <div className="relative hidden overflow-hidden bg-neutral-900 lg:flex lg:w-1/2 lg:items-end lg:justify-center xl:w-3/5">
        <img
          src="https://images.unsplash.com/photo-1614252368727-99517bc90d7b"
          alt=""
          className="absolute inset-0 object-top h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/10" />
        <div className="relative z-10 max-w-md px-16 pb-20 text-center">
          <p className="text-sm font-semibold tracking-[0.3em] text-amber-400 uppercase">Snitch</p>
          <h2 className="mt-6 text-4xl leading-tight font-semibold tracking-tight text-white">
            Welcome back to your wardrobe.
          </h2>
          <p className="mt-4 text-neutral-300">Pick up right where you left off and keep shopping the latest drops.</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex min-h-screen flex-1 items-center justify-center px-6 py-16 sm:px-10 lg:w-1/2 lg:px-16 xl:w-2/5 xl:px-24">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <p className="text-sm font-semibold tracking-[0.2em] text-amber-400 uppercase lg:hidden">Snitch</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white lg:mt-0">Welcome back</h1>
            <p className="mt-3 text-sm text-neutral-400">Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-neutral-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="jane@example.com"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-white placeholder-neutral-600 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm text-neutral-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3 text-white placeholder-neutral-600 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">
                {typeof error === "string" ? error : error.message || "Something went wrong. Please try again."}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-amber-400 py-3 font-medium text-neutral-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-800" />
              <span className="text-xs tracking-wide text-neutral-500 uppercase">Or</span>
              <div className="h-px flex-1 bg-neutral-800" />
            </div>

            <a
              href="/api/auth/google"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900 py-3 font-medium text-white transition hover:bg-neutral-800"
            >
              <FcGoogle className="h-5 w-5" />
              Continue with Google
            </a>

            <p className="text-center text-sm text-neutral-400">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-medium text-amber-400 hover:text-amber-300">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
