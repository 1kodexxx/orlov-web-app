import type { Product } from "./products.data";

export interface CartItem extends Product {
  selectedColor: string;
  selectedModel: string;
  quantity: number;
}
