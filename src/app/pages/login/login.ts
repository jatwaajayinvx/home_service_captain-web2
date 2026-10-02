import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  mobile = '';
  password = '';

  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.errorMessage = '';
    this.loading = true;

    this.authService.login(this.mobile, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));

        this.loading = false;

        this.router.navigate(['/home']);
      },

      error: (error) => {
        this.loading = false;

        this.errorMessage =
          error?.error?.detail ||
          'Login failed. Please check your credentials.';
      }
    });
  }
}