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
  standalone: true,
})
export class SalesComponent {
  activeTab: 'sell' | 'restock' = 'sell';
  items: ItemInterface[] = [];
  filterItems: ItemInterface[] = [];
  restockItemId: number = 0;
  restockQuantity: number = 1;


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
        restockQty: 1,
        sellQty: 1,
      }));
      this.filterItems = [...this.items];
    });

    console.log('item', this.items);
  }
  filterResults(text: string) {
    if (!text) {
      this.filterItems = [...this.items];
      return;
    }
    const lowerText = text.toLowerCase();
    this.filterItems = this.items.filter((item) =>
      item.itemName.toLowerCase().includes(lowerText)
    );
  }


  sellItem(item: ItemInterface) {
    if (!item || item.itemQuantity < item.sellQty) {
      alert('Insufficient stock or invalid item selected');
      return;
    }

    const model: SaleInterface = {
      id: 0,
      itemId: item.id,
      itemName: item.itemName,
      quantity: item.sellQty,
      soldDate: new Date(),
    };

    item.itemQuantity -= item.sellQty;

    this.itemController.updateItem(item).subscribe(() => {
      this.saleController.sellItems(model).subscribe(() => {
        this.loadItems();
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
