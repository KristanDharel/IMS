import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginInterface } from '../interfaces/login-interface';
import { UserInterface } from '../interfaces/user-interface';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'users';
  private loginKey = 'login';
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser && !localStorage.getItem(this.storageKey)) {
      const defaultUsers: UserInterface[] = [
        {
          id: 1,
          name: 'Admin',
          email: 'admin@gmail.com',
          password: 'admin123',
          role: 'admin',
        },
      ];
      localStorage.setItem(this.storageKey, JSON.stringify(defaultUsers));
    }
  }

  private getStoredUsers(): UserInterface[] {
    if (!this.isBrowser) {
      return []; // Return empty array during SSR
    }
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
  private setLoggedInUser(user: LoginInterface): void {
    if (this.isBrowser) {
      localStorage.setItem(this.loginKey, JSON.stringify(user));
    }
  }
  getLoggedInUser(): UserInterface | null {
    if (!this.isBrowser) return null;
    const stored = localStorage.getItem(this.loginKey);
    return stored ? JSON.parse(stored) : null;
  }
  login(email: string, password: string): Observable<UserInterface | null> {
    const users = this.getStoredUsers();
    const user = users.find(
      (u: UserInterface) => u.email === email && u.password === password
    );
    if (user) {
      this.setLoggedInUser(user);
      return of(user);
    }
    return of(null);
  }
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.loginKey);
    }
  }
}
