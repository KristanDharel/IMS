import { Component } from '@angular/core';
import { AuthController } from '../../controller/auth.controller';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserController } from '../../controller/user.controller';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
  standalone: true,
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  constructor(
    private authController: AuthController,
    private router: Router,
    private userController: UserController
  ) {
    const user = this.authController.getLoginDetails();
    if (user) {
      switch (user.role) {
        case 'admin':
        case 'superviser':
          this.router.navigate(['/dashboard']);
          break;
        case 'salesPerson':
          this.router.navigate(['/sales']);
          break;
        default:
          this.router.navigate(['/login']);
          break;
      }
    }
  }

  login() {
    this.authController.login(this.email, this.password).subscribe((user) => {
      if (user) {
        switch (user.role) {
          case 'admin':
          case 'superviser':
            this.router.navigate(['/dashboard']);
            break;
          case 'salesPerson':
            this.router.navigate(['/sales']);
            break;
          default:
            alert('Access denied: Unauthorized role');
            this.router.navigate(['/login']);
            break;
        }
      } else {
        alert('Wrong Credentials');
      }
    });
  }

  logOut() {
    this.authController.logout();
  }
}
