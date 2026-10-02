import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface BookingCreateRequest {
    service_id: number;
    address_id: number;
    problem_description?: string;
    problem_image?: string;
    scheduled_date?: string;
    scheduled_time?: string;
}

export interface BookingResponse {
    id: number;
    booking_number: string;
    customer_id: number;
    captain_id?: number;
    service_id: number;
    address_id: number;

    problem_description?: string;
    problem_image?: string;

    scheduled_date?: string;
    scheduled_time?: string;

    estimated_amount: number;
    final_amount?: number;
    status: string;

    captain_name?: string;
    captain_rating?: number;
    captain_experience?: number;
    captain_mobile?: string;
}

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    private apiUrl = 'http://127.0.0.1:8000/api/bookings';

    constructor(private http: HttpClient) { }

    createBooking(
        data: BookingCreateRequest
    ): Observable<BookingResponse> {

        const token = localStorage.getItem('access_token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.http.post<BookingResponse>(
            this.apiUrl,
            data,
            { headers }
        );
    }
    getBooking(bookingId: number): Observable<BookingResponse> {

        const token = localStorage.getItem('access_token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.http.get<BookingResponse>(
            `${this.apiUrl}/${bookingId}`,
            { headers }
        );
    }

    getMyBookings(): Observable<BookingResponse[]> {

        const token = localStorage.getItem('access_token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`
        });

        return this.http.get<BookingResponse[]>(
            this.apiUrl,
            { headers }
        );
    }
}