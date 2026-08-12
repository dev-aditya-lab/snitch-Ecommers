import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { FiArrowLeft, FiPlus, FiX } from "react-icons/fi";
import { useProducts } from "../hook/useProducts";

const CURRENCIES = ["INR", "USD", "EUR", "GBP", "JPY"];
const MAX_IMAGES = 7;

export default function CreateProduct() {
  const navigate = useNavigate();
  const { createNewProduct, loading, error } = useProducts();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilesSelected = (e) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = MAX_IMAGES - images.length;
    const accepted = files.slice(0, remainingSlots).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...accepted]);
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("priceAmount", form.priceAmount);
    formData.append("priceCurrency", form.priceCurrency);
    images.forEach(({ file }) => formData.append("images", file));

    const success = await createNewProduct(formData);
    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-16 sm:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-amber-600"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <div className="mt-6 mb-10">
          <p className="text-sm font-semibold tracking-[0.2em] text-amber-600 uppercase">Snitch</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">Add a new product</h1>
          <p className="mt-3 text-sm text-neutral-500">List a new item for your store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm text-neutral-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Classic Denim Jacket"
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm text-neutral-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Tell buyers what makes this piece worth wearing"
              className="w-full resize-none rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="priceAmount" className="block text-sm text-neutral-700">
                Price
              </label>
              <input
                id="priceAmount"
                name="priceAmount"
                type="number"
                min="0"
                step="0.01"
                value={form.priceAmount}
                onChange={handleChange}
                required
                placeholder="0.00"
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="priceCurrency" className="block text-sm text-neutral-700">
                Currency
              </label>
              <select
                id="priceCurrency"
                name="priceCurrency"
                value={form.priceCurrency}
                onChange={handleChange}
                className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-neutral-700">Product images</label>
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4">
              {images.map((image, index) => (
                <div
                  key={image.url}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-neutral-200"
                >
                  <img src={image.url} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1.5 right-1.5 rounded-full bg-neutral-900/70 p-1.5 text-white transition hover:bg-red-500/90"
                  >
                    <FiX className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              {images.length < MAX_IMAGES && (
                <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-300 text-neutral-400 transition hover:border-amber-500 hover:text-amber-600">
                  <FiPlus className="h-6 w-6" />
                  <span className="text-xs">Add</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFilesSelected}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-neutral-400">Up to {MAX_IMAGES} images, 5MB each</p>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading || images.length === 0}
            className="w-full rounded-xl bg-amber-400 py-3 font-medium text-neutral-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating product..." : "Create product"}
          </button>
        </form>
      </div>
    </div>
  );
}
