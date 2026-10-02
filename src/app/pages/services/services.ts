import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
    ServiceService,
    ServiceItem
} from '../../services/service';

@Component({
    selector: 'app-services',
    imports: [],
    templateUrl: './services.html',
    styleUrl: './services.scss',
    changeDetection: ChangeDetectionStrategy.Default
})
export class Services implements OnInit {

    categoryId!: number;
    services: ServiceItem[] = [];
    loading = true;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private serviceService: ServiceService,
        private readonly cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {

        this.categoryId = Number(
            this.route.snapshot.paramMap.get('categoryId')
        );

        this.serviceService
            .getServicesByCategory(this.categoryId)
            .subscribe({
                next: (data) => {
                    this.services = data;
                    this.loading = false;
                    this.cdr.detectChanges();
                },
                error: (error) => {
                    console.error('Failed to load services', error);
                    this.loading = false;
                }
            });
    }

    selectService(service: ServiceItem): void {
        this.router.navigate([
            '/booking',
            service.id
        ]);
    }
    goBack(): void {
        this.router.navigate(['/home']);
    }
}