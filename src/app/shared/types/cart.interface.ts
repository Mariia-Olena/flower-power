import { APIproduct } from "@sharedModule/services/entities/types/product.interface";

export interface CartProduct extends APIproduct {
  count: number;
}