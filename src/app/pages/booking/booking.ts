import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
    ServiceService,
    ServiceItem
} from '../../services/service';

@Component({
    selector: 'app-booking',
    imports: [FormsModule],
    templateUrl: './booking.html',
    styleUrl: './booking.scss'
})
export class Booking implements OnInit {

    serviceId!: number;
    service: ServiceItem | null = null;

    problemDescription = '';
    scheduledDate = '';
    scheduledTime = '';

    loading = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private serviceService: ServiceService,
        private readonly cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {

        this.serviceId = Number(
            this.route.snapshot.paramMap.get('serviceId')
        );

        // Temporary: service list se matching service find karna
        // Better API detail endpoint hum next step me add karenge.
        this.serviceService
            .getServicesByCategory(1)
            .subscribe({
                next: (services) => {
                    this.service = services.find(s => s.id === this.serviceId) || null;
                    this.loading = false;
                    this.cdr.detectChanges();
                },
                error: () => {
                    this.loading = false;
                }
            });
    }

    continue(): void {

        if (!this.service) {
            return;
        }

        if (!this.problemDescription.trim()) {
            alert('Please describe your problem.');
            return;
        }

        const bookingData = {
            serviceId: this.serviceId,
            problemDescription: this.problemDescription,
            scheduledDate: this.scheduledDate,
            scheduledTime: this.scheduledTime
        };

        sessionStorage.setItem(
            'booking_data',
            JSON.stringify(bookingData)
        );

        this.router.navigate(['/addresses']);
    }

    goBack() {
        this.router.navigate(['/services', this.service?.category_id])
    }
}