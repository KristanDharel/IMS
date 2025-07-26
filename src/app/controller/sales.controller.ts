import { Injectable } from '@angular/core';
import { SaleSystemService } from '../services/sale-system-service';
import { SaleInterface } from '../interfaces/item-iterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesController {
  constructor(private salesService: SaleSystemService) {}
  sellItems(sale: SaleInterface): Observable<SaleInterface> {
    return this.salesService.sellItems(sale);
  }
  getAllSales() {
    return this.salesService.getAllSales();
  }
}
