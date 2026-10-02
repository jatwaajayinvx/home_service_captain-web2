import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReviewCreateRequest {
  booking_id: number;
  rating: number;
  review_text?: string;
}

export interface ReviewResponse {
  id: number;
  booking_id: number;
  customer_id: number;
  captain_id: number;
  rating: number;
  review_text?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private apiUrl = 'http://127.0.0.1:8000/api/reviews';

  constructor(private http: HttpClient) {}

  createReview(
    data: ReviewCreateRequest
  ): Observable<ReviewResponse> {

    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<ReviewResponse>(
      this.apiUrl,
      data,
      { headers }
    );
  }

  getBookingReview(
    bookingId: number
  ): Observable<ReviewResponse> {

    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<ReviewResponse>(
      `${this.apiUrl}/booking/${bookingId}`,
      { headers }
    );
  }
}