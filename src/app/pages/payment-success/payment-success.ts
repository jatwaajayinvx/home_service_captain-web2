import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './payment-success.html',
  styleUrl: './payment-success.scss'
})
export class PaymentSuccess implements OnInit {

  bookingId!: number;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.bookingId = Number(
      this.route.snapshot.paramMap.get('bookingId')
    );
  }
}