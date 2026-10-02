import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


import {
  BookingService,
  BookingResponse
} from '../../services/booking';
import { ReviewService } from '../../services/review-service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './review.html',
  styleUrl: './review.scss'
})
export class Review implements OnInit {

  bookingId!: number;
  booking: BookingResponse | null = null;

  selectedRating = 0;
  reviewText = '';

  loading = true;
  submitting = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private reviewService: ReviewService,
    private cdf: ChangeDetectorRef
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
  }

  loadBooking(): void {
    this.bookingService
      .getBooking(this.bookingId)
      .subscribe({
        next: (booking) => {
          this.booking = booking;
          this.loading = false;
          this.cdf.detectChanges();
        },
        error: (error) => {
          console.error('Failed to load booking:', error);

          this.errorMessage =
            error?.error?.detail ||
            'Unable to load booking.';

          this.loading = false;
        }
      });
  }

  selectRating(rating: number): void {
    this.selectedRating = rating;
    this.errorMessage = '';
  }

  submitReview(): void {

    if (this.submitting) {
      return;
    }

    if (this.selectedRating < 1) {
      this.errorMessage =
        'Please select a rating.';
      return;
    }

    this.errorMessage = '';
    this.submitting = true;

    const reviewData = {
      booking_id: this.bookingId,
      rating: this.selectedRating,
      review_text: this.reviewText.trim() || undefined
    };

    this.reviewService
      .createReview(reviewData)
      .subscribe({
        next: (response) => {
          console.log('Review submitted:', response);

          this.submitting = false;

          this.router.navigate([
            '/booking-status',
            this.bookingId
          ]);
        },

        error: (error) => {
          console.error('Review submission failed:', error);

          this.submitting = false;

          this.errorMessage =
            error?.error?.detail ||
            'Unable to submit review.';
        }
      });
  }
}