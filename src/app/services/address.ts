import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Address {
  id: number;
  user_id: number;
  address_line: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  address_type?: string;
  is_default: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private apiUrl = 'http://127.0.0.1:8000/api/addresses';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }
}