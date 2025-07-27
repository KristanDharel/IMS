import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SaleInterface } from '../interfaces/item-iterface';
import { SaleSystemService } from './sale-system-service';
import { SalesComponent } from '../component/sales-component/sales-component';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private saleSystemService: SaleSystemService) {}

  getTotalItemsSold() {
    return this.saleSystemService
      .getAllSales()
      .pipe(map((sales: SaleInterface[]) => sales.length));
  }
 
  getTotalItemsSoldToday(): Observable<number> {
    return this.saleSystemService.getAllSales().pipe(
      map((sales) => {
        const today = new Date().toLocaleDateString('en-CA'); 

        const todaysSales = sales.filter((sale) => {
          const saleDateOnly = new Date(sale.soldDate).toLocaleDateString(
            'en-CA'
          );
          return saleDateOnly === today;
        });

        return todaysSales.reduce(
          (sum, sale) => sum + Number(sale.quantity),
          0
        );
      })
    );
  }
  getTotalSales(): Observable<SaleInterface[]> {
    return this.saleSystemService.getAllSales();
  }
  getSalesToday() {
    return this.saleSystemService.getAllSales().pipe(
      map((sales) => {
        const today = new Date().toLocaleDateString('en-CA'); 

        const todaysSales = sales.filter((sale) => {
          const saleDateOnly = new Date(sale.soldDate).toLocaleDateString(
            'en-CA'
          );
          return saleDateOnly === today;
        });
        return todaysSales;
      })
    );
  }
  getQuantityPerItem(): Observable<{
    itemId: number;
    totalQuantity: number;
  } | null> {
    return this.saleSystemService.getAllSales().pipe(
      map((sales) => {
        const productSalesMap = new Map<number, number>();

        sales.forEach((sale) => {
          const itemId = sale.itemId;
          const quantity = Number(sale.quantity);

          if (productSalesMap.has(itemId)) {
            productSalesMap.set(
              itemId,
              productSalesMap.get(itemId)! + quantity
            );
          } else {
            productSalesMap.set(itemId, quantity);
          }
        });

        // Convert map to array of objects
        const salesArray = Array.from(
          productSalesMap,
          ([itemId, totalQuantity]) => ({
            itemId,
            totalQuantity,
          })
        );

        // Find the object with the highest totalQuantity
        if (salesArray.length === 0) return null;

        const mostSold = salesArray.reduce((max, curr) =>
          curr.totalQuantity > max.totalQuantity ? curr : max
        );

        return mostSold;
      })
    );
  }
}
