import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  BookingService,
  BookingResponse
} from '../../services/booking';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.scss'
})
export class MyBookings implements OnInit {

  bookings: BookingResponse[] = [];

  loading = true;
  errorMessage = '';

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {

    this.bookingService
      .getMyBookings()
      .subscribe({
        next: (bookings) => {
          this.bookings = bookings;
          this.loading = false;
          this.cdr.detectChanges();
        },

        error: (error) => {
          console.error(
            'Failed to load bookings:',
            error
          );

          this.errorMessage =
            error?.error?.detail ||
            'Unable to load bookings.';

          this.loading = false;
        }
      });
  }

  getStatusClass(status: string): string {

    switch (status) {
      case 'SEARCHING':
        return 'bg-warning text-dark';

      case 'ACCEPTED':
        return 'bg-primary';

      case 'ON_THE_WAY':
        return 'bg-info text-dark';

      case 'ARRIVED':
        return 'bg-info text-dark';

      case 'STARTED':
        return 'bg-primary';

      case 'COMPLETED':
        return 'bg-success';

      case 'CANCELLED':
        return 'bg-danger';

      default:
        return 'bg-secondary';
    }
  }
}