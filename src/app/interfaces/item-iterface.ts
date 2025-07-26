export interface ItemInterface {
  id: number;
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
  itemAddedDate: string;
  updatedAt: string;
}
export interface SaleInterface {
  id: number;
  itemId: number;
  quantity: number;
  soldDate: string;
}
export interface Stats {
  totalItemsSold: number;
  totalItemsSoldToday: number;
  mostPopularProduct: SaleInterface | null;
}
