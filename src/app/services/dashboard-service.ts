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
    itemName: string;
    totalQuantity: number;
  } | null> {
    return this.saleSystemService.getAllSales().pipe(
      map((sales) => {
        // Map: itemId => { totalQuantity, itemName }
        const productSalesMap = new Map<
          number,
          { totalQuantity: number; itemName: string }
        >();
        console.log('THis is sales', sales);
        sales.forEach((sale) => {
          const itemId = sale.itemId;
          const quantity = Number(sale.quantity);
          const itemName = sale.itemName;

          if (productSalesMap.has(itemId)) {
            const prev = productSalesMap.get(itemId)!;
            productSalesMap.set(itemId, {
              totalQuantity: prev.totalQuantity + quantity,
              itemName: prev.itemName,
            });
          } else {
            productSalesMap.set(itemId, { totalQuantity: quantity, itemName });
          }
        });

        const salesArray = Array.from(productSalesMap, ([itemId, data]) => ({
          itemId,
          itemName: data.itemName,
          totalQuantity: data.totalQuantity,
        }));

        if (salesArray.length === 0) return null;

        const mostSold = salesArray.reduce((max, curr) =>
          curr.totalQuantity > max.totalQuantity ? curr : max
        );

        return mostSold;
      })
    );
  }
}
