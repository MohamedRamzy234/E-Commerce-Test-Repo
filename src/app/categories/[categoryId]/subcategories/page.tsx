import Link from "next/link";
import { getShopCategory, getSubcategory } from "@/api/Services/categoryApi";

type Props = {
  params: Promise<{ categoryId: string }>;
};

export default async function SubcategoryPage({ params }: Props) {
  const { categoryId } = await params;

  const [categories, subcategories] = await Promise.all([
    getShopCategory(),
    getSubcategory(categoryId),
  ]);

  const category = categories.find(
    (item) => item._id === categoryId
  );

  const categoryName = category?.name ?? "Category";
  const categoryImage = category?.image;

  return (
    <section className="min-h-screen w-full bg-slate-50/50 font-sans">
      {/* Green Hero Banner */}
      <div className="w-full bg-emerald-600 px-6 py-10 text-white md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Navigation */}
          <nav className="mb-4 text-xs font-normal text-emerald-100/90 sm:text-sm">
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
              {categoryName}
            </span>
          </nav>

          {/* Banner Content */}
          <div className="flex items-center gap-4">
            {/* Category Image or Icon */}
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/20 p-2 backdrop-blur-md sm:h-16 sm:w-16">
              {categoryImage ? (
                <img
                  src={categoryImage}
                  alt={categoryName}
                  className="h-full w-full object-contain"
                />
              ) : (
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9l10.5-3m0 0v12m0-12L9 12m0 0v6m0-6l10.5-3"
                  />
                </svg>
              )}
            </div>

            {/* Title and Subtitle */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                {categoryName}
              </h1>

              <p className="mt-1 text-xs font-normal text-emerald-100 sm:text-sm">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
        {/* Back Button */}
        <Link
          href="/categories"
          className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-slate-600 transition-colors hover:text-emerald-600 sm:text-sm"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>

          <span>Back to Categories</span>
        </Link>

        {/* Heading Count */}
        <h2 className="mb-6 text-base font-bold text-slate-800 sm:text-lg">
          {subcategories.length} Subcategories in {categoryName}
        </h2>

        {/* Subcategories Grid */}
        {subcategories.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-5 py-12 text-center">
            <p className="font-medium text-gray-700">
              No subcategories found.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              This category doesn't have any subcategories yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {subcategories.map((item) => (
            <Link
    key={item._id}
    href={`/products?subcategory=${item._id}&subcategoryName=${encodeURIComponent(item.name)}`}
    className="group flex min-h-[140px] cursor-pointer flex-col items-start justify-between rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:shadow-[0_2px_12px_rgba(34,197,94,0.15)]"
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
      <svg
        className="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15z" />
        <path d="M1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 10.5h-15a4.483 4.483 0 00-3-.354z" />
      </svg>
    </div>

    <div className="mt-6 flex w-full items-center justify-between gap-2">
      <span className="text-sm font-bold text-slate-800 transition-colors group-hover:text-emerald-600">
        {item.name}
      </span>

      <span className="text-emerald-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        →
      </span>
    </div>
  </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

