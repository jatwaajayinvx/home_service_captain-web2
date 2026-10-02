import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService, BookingResponse } from '../../services/booking';
import { PaymentService, PaymentCreateRequest } from '../../services/payment';
@Component({
    selector: 'app-payment',
    standalone: true,
    imports: [],
    templateUrl: './payment.html',
    styleUrl: './payment.scss',
})
export class Payment implements OnInit {
    bookingId!: number;
    booking: BookingResponse | null = null;
    selectedMethod: 'CASH' | 'UPI' | 'CARD' | 'ONLINE' = 'CASH';
    loading = true;
    paying = false;
    errorMessage = '';
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private bookingService: BookingService,
        private paymentService: PaymentService,
        private cdf: ChangeDetectorRef
    ) { }
    ngOnInit(): void {
        this.bookingId = Number(this.route.snapshot.paramMap.get('bookingId'));
        if (!this.bookingId) {
            this.errorMessage = 'Invalid booking ID.';
            this.loading = false;
            return;
        }
        this.loadBooking();
    }
    loadBooking(): void {
        this.bookingService.getBooking(this.bookingId).subscribe({
            next: (booking) => {
                this.booking = booking;
                this.loading = false;
                this.cdf.detectChanges();
            },
            error: (error) => {
                console.error('Failed to load booking:', error);
                this.errorMessage = error?.error?.detail || 'Unable to load booking.';
                this.loading = false;
            },
        });
    }
    selectMethod(method: 'CASH' | 'UPI' | 'CARD' | 'ONLINE'): void {
        this.selectedMethod = method;
        this.errorMessage = '';
    }
    getAmount(): number {
        if (!this.booking) {
            return 0;
        }
        return Number(this.booking.final_amount ?? this.booking.estimated_amount ?? 0);
    }
    payNow(): void {
        if (!this.booking) {
            return;
        }
        if (this.paying) {
            return;
        }
        this.errorMessage = '';
        this.paying = true;
        const paymentData: PaymentCreateRequest = {
            booking_id: this.booking.id,
            amount: this.getAmount(),
            payment_method: this.selectedMethod,
        };
        this.paymentService.createPayment(paymentData).subscribe({
            next: (response) => {
                console.log('Payment successful:', response);
                this.paying = false;
                this.router.navigate(['/payment-success', this.bookingId]);
            },
            error: (error) => {
                console.error('Payment failed:', error);
                this.paying = false;
                this.errorMessage = error?.error?.detail || 'Payment failed. Please try again.';
            },
        });
    }
}
