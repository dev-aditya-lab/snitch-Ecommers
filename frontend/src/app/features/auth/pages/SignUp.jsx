import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../hook/useAuth";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";

export default function SignUp() {
    const navigate = useNavigate();
  const { handleRegister } = useAuth();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    isSeller: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      handleRegister(form);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white lg:flex">
      {/* Brand panel — desktop only */}
      <div className="relative hidden overflow-hidden bg-neutral-900 lg:flex lg:w-1/2 lg:items-end lg:justify-center xl:w-3/5">
        <img
          src="https://images.unsplash.com/photo-1674383253646-7a54fe8403aa"
          alt=""
          className="absolute inset-0 object-top h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/10" />
        <div className="relative z-10 max-w-md px-16 pb-20 text-center">
          <p className="text-sm font-semibold tracking-[0.3em] text-amber-400 uppercase">Snitch</p>
          <h2 className="mt-6 text-4xl leading-tight font-semibold tracking-tight text-white">
            Style that speaks before you do.
          </h2>
          <p className="mt-4 text-neutral-300">
            Join thousands shopping the latest drops, curated for every wardrobe.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex min-h-screen flex-1 items-center justify-center px-6 py-16 sm:px-10 lg:w-1/2 lg:px-16 xl:w-2/5 xl:px-24">
        <div className="w-full max-w-sm">
          <div className="mb-10 text-center lg:text-left">
            <p className="text-sm font-semibold tracking-[0.2em] text-amber-600 uppercase lg:hidden">Snitch</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900 lg:mt-0">
              Create your account
            </h1>
            <p className="mt-3 text-sm text-neutral-500">Sign up to shop the latest styles</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm text-neutral-700">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm text-neutral-700">
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
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="contact" className="block text-sm text-neutral-700">
                  Contact number
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  value={form.contact}
                  onChange={handleChange}
                  required
                  placeholder="+1 555 000 0000"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm text-neutral-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                />
              </div>
            </div>

            <label htmlFor="isSeller" className="flex cursor-pointer items-center gap-3 pt-1 select-none">
              <input
                id="isSeller"
                name="isSeller"
                type="checkbox"
                checked={form.isSeller}
                onChange={handleChange}
                className="h-5 w-5 rounded border-neutral-300 bg-white accent-amber-500 focus:ring-2 focus:ring-amber-500/30"
              />
              <span className="text-sm text-neutral-700">I want to sell on Snitch</span>
            </label>

            {error && (
              <p className="text-sm text-red-600">
                {typeof error === "string" ? error : error.message || "Something went wrong. Please try again."}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-amber-400 py-3 font-medium text-neutral-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-xs tracking-wide text-neutral-400 uppercase">Or</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            <a
              href="/api/auth/google"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-200 bg-white py-3 font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
            >
              <FcGoogle className="h-5 w-5" />
              Continue with Google
            </a>

            <p className="text-center text-sm text-neutral-500">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-amber-600 hover:text-amber-700">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
