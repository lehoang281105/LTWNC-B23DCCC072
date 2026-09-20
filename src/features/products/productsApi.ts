import type { Product } from '../../types/order-management';
import { mockProducts } from '../../data/mockData';

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProductsApi(): Promise<Product[]> {
  await delay(800);
  return mockProducts.map((product) => ({ ...product }));
}
