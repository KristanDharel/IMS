import { Component } from '@angular/core';
import { ItemInterface, SaleInterface } from '../../interfaces/item-iterface';
import { SalesController } from '../../controller/sales.controller';
import { ItemController } from '../../controller/item.controller';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales-component',
  imports: [CommonModule, FormsModule],

  templateUrl: './sales-component.html',
  styleUrl: './sales-component.css',
})
export class SalesComponent {
  items: ItemInterface[] = [];
  restockItemId: number = 0;
  restockQuantity: number = 1;

  model: SaleInterface = {
    id: 0,
    itemId: 0,
    quantity: 1,
    soldDate: '',
  };
  constructor(
    private saleController: SalesController,
    private itemController: ItemController
  ) {}
  ngOnInit() {
    this.loadItems();
  }
  loadItems() {
    this.itemController.getAllItems().subscribe((items) => {
      this.items = items.map((i) => ({
        ...i,
        itemQuantity: Number(i.itemQuantity),
        itemPrice: Number(i.itemPrice),
      }));
    });

    console.log('item', this.items);
  }

  sellItem() {
    const item = this.items.find((i) => i.id === this.model.itemId);
    console.log(item);
    if (!item || item.itemQuantity < this.model.quantity) {
      alert('Insufficient stock or invalid item selected');
      return;
    }

    item.itemQuantity -= this.model.quantity;
    this.itemController.updateItem(item).subscribe(() => {
      this.saleController.sellItems({ ...this.model }).subscribe(() => {
        this.loadItems();
        // this.loadStats();
      });
    });
  }


  restockItems(itemId: number, itemQuantity: number) {
    const item = this.items.find((i) => i.id === itemId);

    console.log('Restock Items', item);
    console.log('Restock id', itemId);
    console.log('Restock quantity', itemQuantity);
    if (!item) {
      alert('items not found');
      return;
    }
    item.itemQuantity += itemQuantity;
    this.itemController.updateItem(item).subscribe(() => {
      this.loadItems();
    });
  }
}
