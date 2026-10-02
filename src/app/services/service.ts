import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceItem {
  id: number;
  category_id: number;
  name: string;
  description?: string;
  base_price: number;
  estimated_minutes: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://127.0.0.1:8000/api/services';

  constructor(private http: HttpClient) {}

  getServicesByCategory(
    categoryId: number
  ): Observable<ServiceItem[]> {

    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<ServiceItem[]>(
      `${this.apiUrl}/category/${categoryId}`,
      { headers }
    );
  }
}