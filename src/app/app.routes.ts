import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Booking } from './pages/booking/booking';
import { Addresses } from './pages/addresses/addresses';
import { BookingConfirmation } from './pages/booking-confirmation/booking-confirmation';
import { BookingStatus } from './pages/booking-status/booking-status';
import { Payment } from './pages/payment/payment';
import { Review } from './pages/review/review';
import { PaymentSuccess } from './pages/payment-success/payment-success';
import { MyBookings } from './pages/my-bookings/my-bookings';
import { Notifications } from './pages/notifications/notifications';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'services/:categoryId',
        component: Services
    },
    {
        path: 'booking/:serviceId',
        component: Booking
    },
    {
        path: 'addresses',
        component: Addresses
    },
    {
        path: 'booking-confirmation',
        component: BookingConfirmation
    },
    {
        path: 'booking-status/:bookingId',
        component: BookingStatus
    },
    {
        path: 'payment/:bookingId',
        component: Payment
    },
    {
        path: 'review/:bookingId',
        component: Review
    },
    {
        path: 'payment-success/:bookingId',
        component: PaymentSuccess
    },
    {
        path: 'my-bookings',
        component: MyBookings
    },
    {
        path: 'notifications',
        component: Notifications
    },
    {
        path: 'profile',
        component: Profile
    }
];
