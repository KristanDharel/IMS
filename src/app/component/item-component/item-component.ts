import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemController } from '../../controller/item.controller';
import { ItemInterface } from '../../interfaces/item-iterface';
import { ItemFormComponent } from '../item-form-component/item-form-component';

@Component({
  selector: 'app-item-component',
  imports: [CommonModule, FormsModule, ItemFormComponent],
  templateUrl: './item-component.html',
  styleUrl: './item-component.css',
  standalone: true,
})
export class ItemComponent {
  items: ItemInterface[] = [];
  selectedItem: ItemInterface | null = null;
  showForm = false;
  constructor(private itemController: ItemController) {}
  ngOnInit(): void {
    this.loadItems();
  }
  loadItems() {
    this.itemController.getAllItems().subscribe((items) => {
      this.items = items;
    });
  }
  updateItem(item: ItemInterface) {
    this.selectedItem = item;
    this.showForm = true;
  }
  deleteItem(id: number) {
    this.itemController.deleteItems(id).subscribe(() => {
      this.loadItems();
    });
  }
  onFormClose(): void {
    this.selectedItem = null;
    this.showForm = false;
    this.loadItems();
  }

  addNew(): void {
    this.selectedItem = null;
    this.showForm = true;
  }
}
