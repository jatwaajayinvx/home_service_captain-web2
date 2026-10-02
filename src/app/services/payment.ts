import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PaymentCreateRequest {
  booking_id: number;
  amount: number;
  payment_method: 'CASH' | 'UPI' | 'CARD' | 'ONLINE';
}

export interface PaymentResponse {
  id: number;
  booking_id: number;
  amount: number;
  payment_method: string;
  payment_status: string;
  transaction_id?: string;
  paid_at?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl =
    'http://127.0.0.1:8000/api/payments';

  constructor(
    private http: HttpClient
  ) {}

  createPayment(
    data: PaymentCreateRequest
  ): Observable<PaymentResponse> {

    const token =
      localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<PaymentResponse>(
      this.apiUrl,
      data,
      { headers }
    );
  }
}