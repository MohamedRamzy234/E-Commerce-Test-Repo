
import { BrandType } from "../Types/brandTypes";

export async function getAllBrands(): Promise<BrandType[]> {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );

    if (!response.ok) {
      throw new Error(
        `Brands API Error: ${response.status} ${response.statusText}`
      );
    }

    const payload = await response.json();

    return payload.data as BrandType[];
  } catch (error) {
    console.error("getAllBrands error:", error);
    throw error;
  }
}

// export async function getSingleProduct(
//   id: string
// ): Promise<ProductType> {
//   try {
//     const response = await fetch(
//       `https://ecommerce.routemisr.com/api/v1/products/${id}`
//     );

//     if (!response.ok) {
//       throw new Error(
//         `Single Product API Error: ${response.status} ${response.statusText}`
//       );
//     }

//     const payload = await response.json();

//     return payload.data;
//   } catch (error) {
//     console.error("getSingleProduct error:", error);
//     throw error;
//   }
// }

