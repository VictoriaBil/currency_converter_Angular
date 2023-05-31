import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CurrencyHeaderComponent } from '../components/currencyHeader';
import { CurrencyConverterComponent } from '../components/currencyConverter';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyHeaderComponent,
    CurrencyConverterComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
