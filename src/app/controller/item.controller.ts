import { Injectable } from '@angular/core';
import { ItemService } from '../services/item-service';
import { ItemInterface } from '../interfaces/item-iterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemController {
  constructor(private itemService: ItemService) {}
  getAllItems() {
    return this.itemService.getAllItems();
  }
  getItemsById(id: number) {
    return this.itemService.getItemById(id);
  }
  createItem(item: ItemInterface): Observable<ItemInterface> {
    return this.itemService.createItems(item);
  }
  updateItem(item: ItemInterface): Observable<ItemInterface> {
    return this.itemService.updateItems(item);
  }
  deleteItems(id: number): Observable<boolean> {
    return this.itemService.deleteItems(id);
  }
}
