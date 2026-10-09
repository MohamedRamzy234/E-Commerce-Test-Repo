import { Category, Subcategory } from "../Types/producttypes";

export async function getShopCategory(): Promise<Category[]> {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const payload = await response.json();
  return payload.data;
}

export async function getSubcategory(id: string): Promise<Subcategory[]> {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch subcategories");
  }

  const payload = await response.json();
  return payload.data;
}