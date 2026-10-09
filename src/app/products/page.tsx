import ProductCard from "../_components/ProductCard/ProductCard";
import {
  getAllProducts,
  getProductsBySubcategory,
  getProductsByBrand,
} from "@/api/Services/productApi";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    subcategory?: string;
    subcategoryName?: string;
    brand?: string;
    brandName?: string;
  }>;
};

export default async function Products({ searchParams }: Props) {
  const {
    subcategory,
    subcategoryName,
    brand,
    brandName,
  } = await searchParams;

  try {
    // Fetch products based on the selected filter
    const data = brand
      ? await getProductsByBrand(brand)
      : subcategory
        ? await getProductsBySubcategory(subcategory)
        : await getAllProducts();

    if (!Array.isArray(data)) {
      throw new Error("Invalid products API response");
    }

    // Dynamic page title
    const pageTitle = brand
      ? brandName
        ? decodeURIComponent(brandName)
        : "Brand Products"
      : subcategoryName
        ? decodeURIComponent(subcategoryName)
        : "All Products";

    return (
      <section className="min-h-screen bg-slate-50/50 font-sans">
        {/* Hero Banner */}
        <div className="w-full bg-emerald-600 px-6 py-10 text-white md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumb */}
            <nav className="mb-4 text-xs text-emerald-100 sm:text-sm">
              <Link
                href="/"
                className="transition-colors hover:text-white hover:underline"
              >
                Home
              </Link>

              <span className="mx-1.5 opacity-70">/</span>

              <Link
                href="/categories"
                className="transition-colors hover:text-white hover:underline"
              >
                Categories
              </Link>

              <span className="mx-1.5 opacity-70">/</span>

              <span className="font-semibold text-white">
                {pageTitle}
              </span>
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 p-2.5 sm:h-16 sm:w-16">
                <svg
                  className="h-8 w-8 text-white sm:h-9 sm:w-9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                  />
                </svg>
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                  {pageTitle}
                </h1>

                <p className="mt-1 text-xs text-emerald-100 sm:text-sm">
                  {brand
                    ? `Explore products by ${pageTitle}`
                    : subcategory
                      ? `Explore products in ${pageTitle}`
                      : "Explore our complete product collection"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Count */}
        <div className="w-full border-b border-gray-100 bg-white px-6 py-4 md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-medium text-slate-500 sm:text-sm">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {data.length}
              </span>{" "}
              products
            </p>
          </div>
        </div>

        {/* Products Grid / Empty State */}
        {data.length === 0 ? (
          subcategory || brand ? (
            <div className="w-full bg-white font-sans text-slate-700">
              {/* Active Filters */}
              <div className="mx-auto max-w-7xl px-6 pt-6 md:px-12 lg:px-16">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 font-medium text-slate-500">
                      <svg
                        className="h-4 w-4 text-slate-700"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 4.5A1.5 1.5 0 014.5 3h15A1.5 1.5 0 0121 4.5v2.25a1.5 1.5 0 01-.44 1.06l-5.81 5.81a1.5 1.5 0 00-.44 1.06V19.5a1.5 1.5 0 01-2.25 1.3l-3-1.5A1.5 1.5 0 017.5 18v-3.32a1.5 1.5 0 00-.44-1.06L1.25 7.81A1.5 1.5 0 011 6.75V4.5z" />
                      </svg>
                      <span>Active Filters:</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-semibold text-emerald-800">
                      <span>{pageTitle}</span>

                      <Link
                        href="/products"
                        aria-label="Remove filter"
                        className="ml-0.5 transition-colors hover:text-emerald-950"
                      >
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </Link>
                    </div>

                    <Link
                      href="/products"
                      className="text-xs text-slate-500 underline transition-colors hover:text-slate-800"
                    >
                      Clear all
                    </Link>
                  </div>

                  <p className="text-xs font-medium text-slate-500 sm:text-sm">
                    Showing{" "}
                    <span className="font-semibold text-slate-700">0</span>{" "}
                    products
                  </p>
                </div>
              </div>

              {/* Empty State */}
              <div className="flex min-h-[380px] w-full flex-col items-center justify-center px-6 py-12 text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100/90 text-slate-500">
                  <svg
                    className="h-8 w-8 text-slate-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                    />
                  </svg>
                </div>

                <h3 className="mb-1 text-lg font-bold text-slate-900 sm:text-xl">
                  No Products Found
                </h3>

                <p className="mb-6 text-xs text-slate-500 sm:text-sm">
                  No products match your current filters.
                </p>

                <Link
                  href="/products"
                  className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
                >
                  View All Products
                </Link>
              </div>
            </div>
          ) : (
            <p className="py-12 text-center text-gray-500">
              No products found.
            </p>
          )
        ) : (
          <div className="w-full bg-slate-50 px-4 py-12 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-[1400px]">
              <div className="grid grid-cols-1 items-start gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((product) => (
                  <div key={product._id} className="w-full min-w-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    );
  } catch (error) {
    console.error("Products page error:", error);
    throw error;
  }
}

