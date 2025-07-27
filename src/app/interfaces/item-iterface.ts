export interface ItemInterface {
  id: number;
  itemName: string;
  itemQuantity: number;
  itemPrice: number;
  itemAddedDate: string;
  restockQty: number;
  sellQty: number;
  updatedAt: Date;
}
export interface SaleInterface {
  id: number;
  itemId: number;
  itemName: string;
  quantity: number;
  soldDate: Date;
}
export interface Stats {
  totalItemsSold: number;
  totalItemsSoldToday: number;
  mostPopularProduct: SaleInterface | null;
}
