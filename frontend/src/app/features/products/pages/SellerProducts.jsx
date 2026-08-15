import { useEffect } from "react";
import { Link } from "react-router";
import { FiPlus, FiPackage, FiLoader } from "react-icons/fi";
import { useProducts } from "../hook/useProducts";

const PLACEHOLDER_IMAGE = "https://placehold.co/600x600/f5f5f5/a3a3a3?text=Snitch";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: price.currency }).format(price.amount);

export default function SellerProducts() {
  const { fetchSellerProducts, SellerProducts, loading, error } = useProducts();

  useEffect(() => {
    fetchSellerProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white px-6 py-16 sm:px-10">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-amber-100 opacity-40 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-neutral-100 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] text-amber-600 uppercase">Snitch Seller Studio</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900">Your products</h1>
            <p className="mt-3 text-sm text-neutral-500">
              {SellerProducts.length > 0
                ? `${SellerProducts.length} item${SellerProducts.length === 1 ? "" : "s"} live in your catalog`
                : "Manage what you're currently selling"}
            </p>
          </div>

          <Link
            to="/seller/products/create"
            className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neutral-900/10 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-neutral-900/15 active:translate-y-0"
          >
            <FiPlus className="h-4 w-4 text-amber-400 transition-transform duration-300 group-hover:rotate-90" />
            Add product
          </Link>
        </div>

        {error && <p className="mb-6 text-sm text-red-600">{error}</p>}

        {loading && SellerProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-4 py-32 text-neutral-400">
            <FiLoader className="h-6 w-6 animate-spin" />
            <span className="text-sm tracking-wide">Loading products...</span>
          </div>
        )}

        {!loading && SellerProducts.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-dashed border-neutral-200 bg-neutral-50/50 py-28 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-neutral-200">
              <FiPackage className="h-7 w-7 text-neutral-300" />
            </div>
            <div>
              <p className="font-medium text-neutral-900">No products yet</p>
              <p className="mt-1 text-sm text-neutral-500">List your first item to start selling on Snitch</p>
            </div>
            <Link
              to="/seller/products/create"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              <FiPlus className="h-4 w-4 text-amber-400" />
              Add product
            </Link>
          </div>
        )}

        {SellerProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SellerProducts.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-3xl border border-neutral-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-900/6"
              >
                <div className="relative bg-neutral-50 p-5">
                  <div className="mx-auto aspect-square w-4/5 overflow-hidden rounded-2xl bg-neutral-100">
                    <img
                      src={product.images?.[0]?.url || PLACEHOLDER_IMAGE}
                      alt={product.images?.[0]?.altText || product.title}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                  {product.images?.length > 1 && (
                    <span className="absolute right-7 top-7 rounded-full bg-neutral-900/80 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                      +{product.images.length - 1}
                    </span>
                  )}
                </div>
                <div className="space-y-1.5 border-t border-neutral-100 p-5">
                  <h2 className="truncate text-[15px] font-medium text-neutral-900">{product.title}</h2>
                  <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">{product.description}</p>
                  <p className="pt-1.5 text-base font-semibold text-neutral-900">{formatPrice(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
