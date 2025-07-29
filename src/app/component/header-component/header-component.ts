import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-component',
  imports: [NgIf, RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
  standalone: true,
})
export class HeaderComponent {
  user: any = null;

  constructor(private router: Router) {}
  ngOnInit() {
    const storedUser = localStorage.getItem('login');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }

  logout() {
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }
}
