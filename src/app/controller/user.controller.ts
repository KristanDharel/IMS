import { Injectable } from '@angular/core';
import { UserService } from '../services/user-service';
import { UserInterface } from '../interfaces/user-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserController {
  constructor(private userService: UserService) {}

  getAllUsers() {
    return this.userService.getAllUsers();
  }
  getUserById(id: number) {
    return this.userService.getUserById(id);
  }
  createUser(user: UserInterface): Observable<UserInterface> {
    return this.userService.createUser(user);
  }
  updateUser(user: UserInterface): Observable<UserInterface> {
    return this.userService.updateUser(user);
  }
  deleteUser(id: number): Observable<boolean> {
    return this.userService.deleteUser(id);
  }
}
