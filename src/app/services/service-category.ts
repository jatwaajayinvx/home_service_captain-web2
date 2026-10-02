import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceCategory {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService {

  private apiUrl = 'http://127.0.0.1:8000/api/service-categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ServiceCategory[]> {
    const token = localStorage.getItem('access_token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<ServiceCategory[]>(
      this.apiUrl,
      { headers }
    );
  }
}