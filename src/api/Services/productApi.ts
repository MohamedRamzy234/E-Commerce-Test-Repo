
import { ProductType } from "../Types/producttypes";

export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products"
    );

    if (!response.ok) {
      throw new Error(
        `Products API Error: ${response.status} ${response.statusText}`
      );
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.error("getAllProducts error:", error);
    throw error;
  }
}
export async function getProductsBySubcategory(
  subcategoryId: string
): Promise<ProductType[]> {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?subcategory=${subcategoryId}`
  );

  if (!response.ok) {
    throw new Error(
      `Products API Error: ${response.status} ${response.statusText}`
    );
  }

  const payload = await response.json();
  return payload.data;
}
export async function getProductsByBrand(
  brandId: string
): Promise<ProductType[]> {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
  );

  if (!response.ok) {
    throw new Error(`Products API Error: ${response.status}`);
  }

  const payload = await response.json();
  return payload.data;
}

export async function getSingleProduct(
  id: string
): Promise<ProductType> {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );

    if (!response.ok) {
      throw new Error(
        `Single Product API Error: ${response.status} ${response.statusText}`
      );
    }

    const payload = await response.json();

    return payload.data;
  } catch (error) {
    console.error("getSingleProduct error:", error);
    throw error;
  }
}

