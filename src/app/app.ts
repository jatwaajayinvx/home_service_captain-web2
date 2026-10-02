import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NotificationService } from './services/notification-service';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  unreadCount = 0;

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUnreadCount();
  }

  loadUnreadCount(): void {

    const token = localStorage.getItem('access_token');

    if (!token) {
      return;
    }

    this.notificationService
      .getUnreadCount()
      .subscribe({
        next: (response) => {
          this.unreadCount = response.unread_count;
        },
        error: (error) => {
          console.error(
            'Failed to load unread count:',
            error
          );
        }
      });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout(): void {

    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    this.unreadCount = 0;

    this.router.navigate(['/login']);
  }
}