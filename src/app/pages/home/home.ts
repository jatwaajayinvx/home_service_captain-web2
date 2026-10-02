import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ServiceCategoryService, ServiceCategory } from '../../services/service-category';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.html',
    styleUrl: './home.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home implements OnInit {

    categories = signal<ServiceCategory[]>([]);
    loading = signal(false);

    constructor(
        private categoryService: ServiceCategoryService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loading.set(true);
        this.categoryService.getCategories()
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe({
                next: (data) => {
                    this.categories.set(data);
                },
                error: (error) => {
                    console.error('Failed to load categories', error);
                }
            });
    }
    selectCategory(category: ServiceCategory): void {
        this.router.navigate([
            '/services',
            category.id
        ]);
    }
}