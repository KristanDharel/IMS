import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { SaleInterface } from '../interfaces/item-iterface';

@Injectable({
  providedIn: 'root',
})
export class SaleSystemService {
  private storageKey = 'Sales';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Initialize the users array in local storage if it doesn't exist
    if (this.isBrowser && !localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }
  private implementDelay<T>(data: T): Observable<T> {
    const delayTime = Math.random() * 2000 + 500;
    return of(data).pipe(delay(delayTime));
  }
  private getStoredSales(): SaleInterface[] {
    if (!this.isBrowser) {
      return []; // Return empty array during SSR
    }
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private setStoredSales(sales: SaleInterface[]): void {
    if (this.isBrowser) {
      localStorage.setItem(this.storageKey, JSON.stringify(sales));
    }
  }
  sellItems(sale: SaleInterface): Observable<SaleInterface> {
    const sales = this.getStoredSales();
    sale.id = Date.now();
    sales.push(sale);
    this.setStoredSales(sales);
    return this.implementDelay(sale);
  }

  getAllSales(): Observable<SaleInterface[]> {
    const sales = this.getStoredSales();
    return of(sales);
  }
}
