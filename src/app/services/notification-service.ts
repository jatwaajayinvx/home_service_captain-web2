import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface NotificationItem {
  id: number;
  user_id: number;
  booking_id?: number;
  title: string;
  message: string;
  notification_type: string;
  is_read: boolean;
  created_at?: string;
}

export interface UnreadCountResponse {
  unread_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl =
    'http://127.0.0.1:8000/api/notifications';

  constructor(
    private http: HttpClient
  ) {}

  private getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('access_token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getNotifications(): Observable<NotificationItem[]> {

    return this.http.get<NotificationItem[]>(
      this.apiUrl,
      {
        headers: this.getHeaders()
      }
    );
  }

  getUnreadCount(): Observable<UnreadCountResponse> {

    return this.http.get<UnreadCountResponse>(
      `${this.apiUrl}/unread-count`,
      {
        headers: this.getHeaders()
      }
    );
  }

  markAsRead(
    notificationId: number
  ): Observable<NotificationItem> {

    return this.http.put<NotificationItem>(
      `${this.apiUrl}/${notificationId}/read`,
      {},
      {
        headers: this.getHeaders()
      }
    );
  }
}