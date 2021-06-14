import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PizzaCardComponent } from './components/pizza-card/pizza-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomizeToppingsComponent } from './components/customize-toppings/customize-toppings.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AddPizzaComponent } from './components/add-pizza/add-pizza.component';
import { CartComponent } from './components/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    AddPizzaComponent,
    CartComponent,
    PizzaCardComponent,
    DashboardComponent,
    CustomizeToppingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  entryComponents: [CustomizeToppingsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
