import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-booking-confirmation',
  imports: [],
  templateUrl: './booking-confirmation.html',
  styleUrl: './booking-confirmation.scss'
})
export class BookingConfirmation implements OnInit {

  bookingData: any = null;

  loading = true;
  submitting = false;
  errorMessage = '';

  constructor(
    private bookingService: BookingService,
    private router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const storedData =
      sessionStorage.getItem('booking_data');

    if (!storedData) {
      this.router.navigate(['/home']);
      return;
    }

    this.bookingData = JSON.parse(storedData);
    this.loading = false;
    this.cdr.detectChanges();
  }

  confirmBooking(): void {

    if (!this.bookingData) {
      return;
    }

    this.submitting = true;
    this.errorMessage = '';

    const request = {
      service_id: this.bookingData.serviceId,
      address_id: this.bookingData.addressId,
      problem_description:
        this.bookingData.problemDescription || undefined,
      scheduled_date:
        this.bookingData.scheduledDate || undefined,
      scheduled_time:
        this.bookingData.scheduledTime || undefined
    };

    this.bookingService.createBooking(request)
    .pipe(finalize(() => this.submitting = false))
    .subscribe({

      next: (booking) => {

        sessionStorage.removeItem('booking_data');

        this.router.navigate([
          '/booking-status',
          booking.id
        ]);
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Booking creation failed',
          error
        );

        this.errorMessage =
          error?.error?.detail ||
          'Unable to create booking. Please try again.';

        this.submitting = false;
      }

    });
  }
  goBack(){
    this.router.navigate(['/addresses'])
  }
}