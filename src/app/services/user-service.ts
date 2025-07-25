import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { UserInterface } from '../interfaces/user-interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private storageKey = 'users';
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

  private getStoredUsers(): UserInterface[] {
    if (!this.isBrowser) {
      return []; // Return empty array during SSR
    }
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  private setStoredUsers(users: UserInterface[]): void {
    if (this.isBrowser) {
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
  }

  getAllUsers(): Observable<UserInterface[]> {
    const users = this.getStoredUsers();
    // return this.implementDelay(users);
    return of(users);
  }

  getUserById(id: number): Observable<UserInterface | undefined> {
    const users = this.getStoredUsers();
    const user = users.find((u) => u.id === id);
    return this.implementDelay(user);
  }

  createUser(user: UserInterface): Observable<UserInterface> {
    const users = this.getStoredUsers();
    user.id = Date.now();
    users.push(user);
    this.setStoredUsers(users);
    return this.implementDelay(user);
  }

  updateUser(user: UserInterface): Observable<UserInterface> {
    let users = this.getStoredUsers();
    users = users.map((u) => (u.id === user.id ? user : u));
    this.setStoredUsers(users);
    return this.implementDelay(user);
  }

  deleteUser(id: number): Observable<boolean> {
    let users = this.getStoredUsers();
    users = users.filter((u) => u.id !== id);
    this.setStoredUsers(users);
    return this.implementDelay(true);
  }
}
