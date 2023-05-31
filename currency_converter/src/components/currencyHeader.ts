import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ExchangeRate {
  USD: number;
  EUR: number;
}

@Component({
  selector: 'app-currency-header',
  templateUrl: '../components/currencyHeader.html',
  styleUrls: [''],
})
export class CurrencyHeaderComponent implements OnInit {
  exchangeRate: ExchangeRate = { USD: 0, EUR: 0 };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getExchangeRate();
  }

  getExchangeRate() {
    const from = 'USD';
    const apiKey = '53b7a0a881fb89c3a53c4f53';
    this.http
      .get<ExchangeRate>(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`
      )
      .subscribe(
        (data: ExchangeRate) => {
          this.exchangeRate = data;
        },
        (error) => {
          console.error('Failed to fetch exchange rate', error);
        }
      );
  }
}
