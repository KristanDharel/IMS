import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { RoleInterface } from '../interfaces/role-interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private storageKey = 'role';
  private isBrowser: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // Initialize the users array in local storage if it doesn't exist
    if (this.isBrowser && !localStorage.getItem(this.storageKey)) {
      localStorage.setItem(this.storageKey, JSON.stringify([]));
    }
  }
  private implementDelay<T>(data: T): Observable<T> {
    const delayTime = Math.random() * 2000 + 500;
    return of(data).pipe(delay(delayTime));
  }
  private getStoredRole(): RoleInterface[] {
    if (!this.isBrowser) {
      return []; // Return empty array during SSR
    }
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private setStoredRole(users: RoleInterface[]): void {
    if (this.isBrowser) {
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
  }
  getAllRoles(): Observable<RoleInterface[]> {
    const role = this.getStoredRole();
    return of(role);
  }
  createRole(role: RoleInterface): Observable<RoleInterface> {
    const roles = this.getStoredRole();
    role.id = Date.now();
    roles.push(role);
    this.setStoredRole(roles);
    return this.implementDelay(role);
  }
  updateRole(role: RoleInterface): Observable<RoleInterface> {
    let roles = this.getStoredRole();
    roles = roles.map((r) => (r.id === role.id ? role : r));
    this.setStoredRole(roles);
    return this.implementDelay(role);
  }
  deleteRole(id: number): Observable<boolean> {
    let roles = this.getStoredRole();
    roles = roles.filter((r) => r.id !== id);
    this.setStoredRole(roles);
    // return this.implementDelay(true);
    return of(true);
  }
}
