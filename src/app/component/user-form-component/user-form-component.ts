import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInterface } from '../../interfaces/user-interface';
import { UserController } from '../../controller/user.controller';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RoleInterface } from '../../interfaces/role-interface';
import { RoleComponent } from '../role-component/role-component';
import { RoleCOntroller } from '../../controller/role.controller';

@Component({
  selector: 'app-user-form-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form-component.html',
  styleUrl: './user-form-component.css',
})
export class UserFormComponent implements OnInit {
  @Input() user: UserInterface | null = null;
  @Output() formClose = new EventEmitter<void>();
  model: UserInterface = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: '',
  };
  roles: RoleInterface[] = [];
  constructor(
    private userController: UserController,
    private roleController: RoleCOntroller
  ) {}

  ngOnInit() {
    if (this.user) {
      this.model = { ...this.user };
    }
    this.loadRoles();
  }
  loadRoles() {
    this.roleController.getallRoles().subscribe((roles) => {
      this.roles = roles;
      console.log(this.roles);
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      alert('Form is invalid, please fill all required fields.');
      return;
    }
    if (this.user) {
      // update
      this.userController.updateUser(this.model).subscribe(() => {
        this.formClose.emit();
      });
    } else {
      // create
      this.userController.createUser(this.model).subscribe(() => {
        this.formClose.emit();
      });
    }
  }

  onCancel() {
    this.formClose.emit();
  }
}
