import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Observable } from 'rxjs';
import { LoginInterface } from '../interfaces/login-interface';
import { UserInterface } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthController {
  constructor(private authService: AuthService) {}
  getLoginDetails(): UserInterface | null {
    return this.authService.getLoggedInUser();
  }
  login(email: string, password: string): Observable<UserInterface | null> {
    return this.authService.login(email, password);
  }
  logout() {
    this.authService.logout();
  }
}
