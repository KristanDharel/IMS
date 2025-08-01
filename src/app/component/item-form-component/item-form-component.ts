import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemInterface } from '../../interfaces/item-iterface';
import { ItemController } from '../../controller/item.controller';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-item-form-component',
  imports: [CommonModule, FormsModule],

  templateUrl: './item-form-component.html',
  styleUrl: './item-form-component.css',
  standalone: true,
})
export class ItemFormComponent {
  @Input() item: ItemInterface | null = null;
  @Output() formClose = new EventEmitter<void>();
  model: ItemInterface = {
    id: 0,
    itemName: '',
    itemQuantity: 0,
    itemPrice: 0,
    itemAddedDate: '',
    restockQty: 1,
    sellQty: 1,
    updatedAt: new Date(),
  };
  constructor(private itemController: ItemController) {}
  ngOnInit() {
    if (this.item) {
      this.model = { ...this.item };
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      alert('Form is invalid, please fill all required fields.');
      return;
    }
    if (this.item) {
      this.itemController.updateItem(this.model).subscribe(() => {
        this.formClose.emit();
      });
    } else {
      this.itemController.createItem(this.model).subscribe(() => {
        this.formClose.emit();
      });
    }
  }
  onImageSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.model.itemImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}

  onCancel() {
    this.formClose.emit();
  }
}
