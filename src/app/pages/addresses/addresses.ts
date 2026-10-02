import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AddressService,
  Address
} from '../../services/address';

@Component({
  selector: 'app-addresses',
  imports: [],
  templateUrl: './addresses.html',
  styleUrl: './addresses.scss'
})
export class Addresses implements OnInit {

  addresses: Address[] = [];
  selectedAddressId: number | null = null;
  loading = true;

  constructor(
    private addressService: AddressService,
    private router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  loadAddresses(): void {
    this.addressService.getAddresses().subscribe({
      next: (data) => {
        this.addresses = data;

        const defaultAddress = data.find(
          address => address.is_default
        );

        if (defaultAddress) {
          this.selectedAddressId = defaultAddress.id;
        }

        this.loading = false;
         this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load addresses', error);
        this.loading = false;
      }
    });
  }

  selectAddress(address: Address): void {
    this.selectedAddressId = address.id;
  }

  continue(): void {
    if (!this.selectedAddressId) {
      alert('Please select an address.');
      return;
    }

    const bookingData = JSON.parse(
      sessionStorage.getItem('booking_data') || '{}'
    );

    bookingData.addressId = this.selectedAddressId;

    sessionStorage.setItem(
      'booking_data',
      JSON.stringify(bookingData)
    );

    this.router.navigate(['/booking-confirmation']);
  }
  goBack(){
    this.router.navigate(['/home'])
  }
}