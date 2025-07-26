import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoleInterface } from '../../interfaces/role-interface';
import { RoleCOntroller } from '../../controller/role.controller';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-role-form-component',
  imports: [CommonModule, FormsModule],

  templateUrl: './role-form-component.html',
  styleUrl: './role-form-component.css',
})
export class RoleFormComponent {
  @Input() role: RoleInterface | null = null;
  @Output() formClose = new EventEmitter<void>();
  model: RoleInterface = {
    id: 0,
    role: '',
  };
  constructor(private roleController: RoleCOntroller) {}
  ngOnInit() {
    if (this.role) {
      this.model = { ...this.role };
    }
  }
  onSubmit(form: NgForm) {
    if (this.role) {
      this.roleController.updateRole(this.model).subscribe(() => {
        this.formClose.emit();
      });
    } else {
      this.roleController.createRoles(this.model).subscribe(() => {
        this.formClose.emit();
      });
    }
  }
  onCancel() {
    this.formClose.emit();
  }
}
