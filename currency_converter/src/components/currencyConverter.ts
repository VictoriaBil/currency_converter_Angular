// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// interface ExchangeRate {
//   rates: { [key: string]: number };
// }

// @Component({
//   selector: 'app-currency-converter',
//   templateUrl: '../components/currencyConverter.html',
//   styleUrls: ['../components/currencyConverter.css'],
// })
// export class CurrencyConverterComponent {
//   currency1: string = 'UAH';
//   currency2: string = 'USD';
//   currency1Value: number = 0;
//   currency2Value: number = 0;

//   constructor(private http: HttpClient) {}

//   convertCurrency(target: number) {
//     if (target === 1) {
//       this.currency2Value =
//         this.currency1Value *
//         this.getExchangeRate(this.currency1, this.currency2);
//     } else {
//       this.currency1Value =
//         this.currency2Value *
//         this.getExchangeRate(this.currency2, this.currency1);
//     }
//   }

//   getExchangeRate(from: string, to: string): number {
//     const apiKey = '53b7a0a881fb89c3a53c4f53';
//     const apiUrl = `https://api.exchangerate-api.com/v4/latest/${from}?apiKey=${apiKey}`;

//     this.http.get<ExchangeRate>(apiUrl).subscribe(
//       (exchangeRate: ExchangeRate) => {
//         const rate = exchangeRate.rates[to];
//         if (rate) {
//           if (from === this.currency1 && to === this.currency2) {
//             this.currency2Value = this.currency1Value * rate;
//           } else if (from === this.currency2 && to === this.currency1) {
//             this.currency1Value = this.currency2Value * rate;
//           }
//         }
//       },
//       (error: any) => {
//         console.error(
//           'An error occurred while fetching exchange rates:',
//           error
//         );
//       }
//     );

//     return 0;
//   }
// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface ExchangeRate {
  rates: { [key: string]: number };
}

@Component({
  selector: 'app-currency-converter',
  templateUrl: '../components/currencyConverter.html',
  styleUrls: ['../components/currencyConverter.css'],
})
export class CurrencyConverterComponent {
  currency1: string = 'UAH';
  currency2: string = 'USD';
  currency1Value: number = 0;
  currency2Value: number = 0;

  constructor(private http: HttpClient) {}

  convertCurrency(target: number) {
    if (target === 1) {
      this.getExchangeRate(this.currency1, this.currency2).subscribe((rate) => {
        this.currency2Value = this.currency1Value * rate;
      });
    } else {
      this.getExchangeRate(this.currency2, this.currency1).subscribe((rate) => {
        this.currency1Value = this.currency2Value * rate;
      });
    }
  }

  getExchangeRate(from: string, to: string): Observable<number> {
    const apiKey = '53b7a0a881fb89c3a53c4f53';
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${from}?apiKey=${apiKey}`;

    return this.http.get<ExchangeRate>(apiUrl).pipe(
      map((exchangeRate: ExchangeRate) => exchangeRate.rates[to]),
      tap((rate: number) => {
        if (!rate) {
          console.error('Exchange rate not found');
        }
      })
    );
  }
}
