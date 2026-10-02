import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationItem, NotificationService } from '../../services/notification-service';

// import {
//   NotificationService,
//   NotificationItem
// } from '../../services/notification';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss'
})
export class Notifications implements OnInit {

  notifications: NotificationItem[] = [];

  loading = true;
  errorMessage = '';

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private cdf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {

    this.notificationService
      .getNotifications()
      .subscribe({
        next: (notifications) => {
          this.notifications = notifications;
          this.loading = false;
          this.cdf.detectChanges();
        },

        error: (error) => {
          console.error(
            'Failed to load notifications:',
            error
          );

          this.errorMessage =
            error?.error?.detail ||
            'Unable to load notifications.';

          this.loading = false;
        }
      });
  }

  openNotification(
    notification: NotificationItem
  ): void {

    if (!notification.is_read) {

      this.notificationService
        .markAsRead(notification.id)
        .subscribe({
          next: () => {
            notification.is_read = true;
            this.navigateToBooking(notification);
          },

          error: (error) => {
            console.error(
              'Failed to mark notification as read:',
              error
            );

            this.navigateToBooking(notification);
          }
        });

    } else {
      this.navigateToBooking(notification);
    }
  }

  private navigateToBooking(
    notification: NotificationItem
  ): void {

    if (notification.booking_id) {

      this.router.navigate([
        '/booking-status',
        notification.booking_id
      ]);

    }
  }

  getIcon(type: string): string {

    switch (type) {

      case 'BOOKING_ACCEPTED':
        return 'bi-person-check-fill';

      case 'BOOKING_ON_THE_WAY':
        return 'bi-car-front-fill';

      case 'BOOKING_ARRIVED':
        return 'bi-geo-alt-fill';

      case 'BOOKING_STARTED':
        return 'bi-tools';

      case 'BOOKING_COMPLETED':
        return 'bi-check-circle-fill';

      case 'NEW_JOB':
        return 'bi-briefcase-fill';

      default:
        return 'bi-bell-fill';
    }
  }
}