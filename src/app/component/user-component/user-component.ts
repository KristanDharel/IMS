import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserController } from '../../controller/user.controller';
import { UserInterface } from '../../interfaces/user-interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserFormComponent } from '../user-form-component/user-form-component';

@Component({
  selector: 'app-user-component',
  imports: [CommonModule, FormsModule, UserFormComponent],
  templateUrl: './user-component.html',
  styleUrl: './user-component.css',
  standalone: true,
})
export class UserComponent implements OnInit {
  users: UserInterface[] = [];
  selectedUser: UserInterface | null = null;
  showForm = false;
  constructor(private userController: UserController) {}
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers() {
    this.userController.getAllUsers().subscribe((users) => {
      this.users = users;
    });
  }
  updateUser(user: UserInterface) {
    this.selectedUser = user;
    this.showForm = true;
  }
  deleteUser(id: number) {
    this.userController.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
  onFormClose(): void {
    this.selectedUser = null;
    this.showForm = false;
    this.loadUsers();
  }

  addNew(): void {
    this.selectedUser = null;
    this.showForm = true;
  }
}
