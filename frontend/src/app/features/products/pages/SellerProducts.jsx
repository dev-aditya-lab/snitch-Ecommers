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
    <div className="min-h-screen bg-white px-6 py-16 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-amber-600 uppercase">Snitch</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">Your products</h1>
            <p className="mt-3 text-sm text-neutral-500">Manage what you're currently selling</p>
          </div>

          <Link
            to="/seller/products/create"
            className="flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 font-medium text-neutral-950 transition hover:bg-amber-300"
          >
            <FiPlus className="h-4 w-4" />
            Add product
          </Link>
        </div>

        {error && <p className="mb-6 text-sm text-red-600">{error}</p>}

        {loading && SellerProducts.length === 0 && (
          <div className="flex items-center justify-center gap-3 py-24 text-neutral-400">
            <FiLoader className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading products...</span>
          </div>
        )}

        {!loading && SellerProducts.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-neutral-200 py-24 text-center">
            <FiPackage className="h-10 w-10 text-neutral-300" />
            <div>
              <p className="text-neutral-900">No products yet</p>
              <p className="mt-1 text-sm text-neutral-500">List your first item to start selling on Snitch</p>
            </div>
            <Link
              to="/seller/products/create"
              className="mt-2 flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-medium text-neutral-950 transition hover:bg-amber-300"
            >
              <FiPlus className="h-4 w-4" />
              Add product
            </Link>
          </div>
        )}

        {SellerProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SellerProducts.map((product) => (
              <div
                key={product._id}
                className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:border-amber-400/60 hover:shadow-md"
              >
                <div className="aspect-square w-full overflow-hidden bg-neutral-100">
                  <img
                    src={product.images?.[0]?.url || PLACEHOLDER_IMAGE}
                    alt={product.images?.[0]?.altText || product.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="space-y-1.5 p-5">
                  <h2 className="truncate font-medium text-neutral-900">{product.title}</h2>
                  <p className="line-clamp-2 text-sm text-neutral-500">{product.description}</p>
                  <p className="pt-1 font-semibold text-amber-600">{formatPrice(product.price)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
