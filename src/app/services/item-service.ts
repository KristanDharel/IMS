import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ItemInterface } from '../interfaces/item-iterface';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private storageKey = 'Items';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser && !localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }

  private implementDelay<T>(data: T): Observable<T> {
    const delayTime = Math.random() * 2000 + 500;
    return of(data).pipe(delay(delayTime));
  }
  private getStoredItems(): ItemInterface[] {
    if (!this.isBrowser) {
      return []; // Return empty array during SSR
    }
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private setStoredItem(items: ItemInterface[]): void {
    if (this.isBrowser) {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    }
  }
  getAllItems(): Observable<ItemInterface[]> {
    const items = this.getStoredItems();
    // return this.implementDelay(items);
    return of(items);
  }
  getItemById(id: number): Observable<ItemInterface | undefined> {
    const items = this.getStoredItems();
    const item = items.find((i) => i.id === id);
    return this.implementDelay(item);
  }
  createItems(item: ItemInterface): Observable<ItemInterface> {
    const items = this.getStoredItems();
    item.id = Date.now();
    items.push(item);
    this.setStoredItem(items);
    return this.implementDelay(item);
  }
  updateItems(item: ItemInterface): Observable<ItemInterface> {
    let items = this.getStoredItems();
    items = items.map((i) => (i.id === item.id ? item : i));
    this.setStoredItem(items);
    return this.implementDelay(item);
  }
  deleteItems(id: number): Observable<boolean> {
    let items = this.getStoredItems();
    items = items.filter((i) => i.id !== id);
    this.setStoredItem(items);
    return this.implementDelay(true);
    // return of(true);
  }
}
