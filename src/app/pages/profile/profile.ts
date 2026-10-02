import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface UserProfile {
  id: number;
  name: string;
  mobile: string;
  email?: string;
  role: string;
  is_active: boolean;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {

  user: UserProfile | null = null;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    const userData =
      localStorage.getItem('user');

    if (!userData) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.user = JSON.parse(userData);
    } catch (error) {
      console.error(
        'Invalid user data:',
        error
      );

      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }
  }

  logout(): void {

    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }
}