import { Injectable } from '@angular/core';
import { RoleService } from '../services/role-service';
import { RoleInterface } from '../interfaces/role-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleCOntroller {
  constructor(private roleService: RoleService) {}
  getallRoles() {
    return this.roleService.getAllRoles();
  }
  createRoles(role: RoleInterface): Observable<RoleInterface> {
    return this.roleService.createRole(role);
  }
  updateRole(role: RoleInterface): Observable<RoleInterface> {
    return this.roleService.updateRole(role);
  }
  deleteRole(id: number): Observable<boolean> {
    return this.roleService.deleteRole(id);
  }
}
