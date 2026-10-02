import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import {
  BookingService,
  BookingResponse
} from '../../services/booking';

@Component({
  selector: 'app-booking-status',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './booking-status.html',
  styleUrl: './booking-status.scss'
})
export class BookingStatus implements OnInit, OnDestroy {

  bookingId!: number;

  booking: BookingResponse | null = null;

  loading = true;
  errorMessage = '';

  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.bookingId = Number(
      this.route.snapshot.paramMap.get('bookingId')
    );

    if (!this.bookingId) {

      this.errorMessage = 'Invalid booking ID.';
      this.loading = false;

      return;
    }

    this.loadBooking();

    // Refresh booking status every 5 seconds
    this.intervalId = setInterval(() => {
      this.loadBooking();
    }, 5000);
  }

  loadBooking(): void {

    this.bookingService
      .getBooking(this.bookingId)
      .subscribe({

        next: (booking: BookingResponse) => {

          this.booking = booking;
          this.loading = false;

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Failed to load booking:',
            error
          );

          this.errorMessage =
            error?.error?.detail ||
            'Unable to load booking.';

          this.loading = false;

          this.cdr.detectChanges();
        }

      });
  }

  getStatusTitle(): string {

    switch (this.booking?.status) {

      case 'SEARCHING':
        return 'Finding a Captain...';

      case 'ACCEPTED':
        return 'Captain Assigned';

      case 'ON_THE_WAY':
        return 'Captain is on the way';

      case 'ARRIVED':
        return 'Captain has arrived';

      case 'STARTED':
        return 'Service Started';

      case 'COMPLETED':
        return 'Service Completed';

      case 'CANCELLED':
        return 'Booking Cancelled';

      default:
        return 'Booking Status';
    }
  }

  isStatusActive(status: string): boolean {

    const currentStatus = this.booking?.status;

    const statusOrder = [
      'SEARCHING',
      'ACCEPTED',
      'ON_THE_WAY',
      'ARRIVED',
      'STARTED',
      'COMPLETED'
    ];

    const currentIndex =
      statusOrder.indexOf(currentStatus || '');

    const targetIndex =
      statusOrder.indexOf(status);

    if (
      currentIndex === -1 ||
      targetIndex === -1
    ) {
      return false;
    }

    return targetIndex <= currentIndex;
  }

  ngOnDestroy(): void {

    if (this.intervalId !== null) {

      clearInterval(this.intervalId);

      this.intervalId = null;
    }
  }
}