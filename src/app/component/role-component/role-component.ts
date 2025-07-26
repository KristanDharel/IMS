import { Component } from '@angular/core';
import { RoleInterface } from '../../interfaces/role-interface';
import { RoleCOntroller } from '../../controller/role.controller';
import { NgFor, NgIf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { RoleFormComponent } from '../role-form-component/role-form-component';

@Component({
  selector: 'app-role-component',
  imports: [NgIf, NgFor, RoleFormComponent],
  templateUrl: './role-component.html',
  styleUrl: './role-component.css',
  standalone: true,
})
export class RoleComponent {
  roles: RoleInterface[] = [];
  selectedRole: RoleInterface | null = null;
  showForm = false;
  constructor(private roleController: RoleCOntroller) {}
  ngOnInit(): void {
    this.loadRole();
  }
  loadRole() {
    this.roleController.getallRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }
  updateRole(role: RoleInterface) {
    this.selectedRole = role;
    this.showForm = true;
  }
  deleteRole(id: number) {
    this.roleController.deleteRole(id).subscribe(() => {
      this.loadRole();
    });
  }
  onFormClose(): void {
    this.selectedRole = null;
    this.showForm = false;
    this.loadRole();
  }

  addNew(): void {
    this.selectedRole = null;
    this.showForm = true;
  }
}
