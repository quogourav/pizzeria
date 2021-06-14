import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { PizzaService } from 'src/app/shared/services/pizza.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$ = this.pizzaService.cartPizzas$;
  cartTotal$ = this.pizzaService.cartTotal$;
  name: string;
  phone: string;
  email: string;
  constructor(private pizzaService: PizzaService, private router: Router, private customerService: CustomerService) { }

  ngOnInit() {
  }

  goto(url: string) {
    this.router.navigateByUrl(url);
  }

  async saveOrder() {
    const customer = await this.customerService.saveCustomer(this.name, this.email, this.phone).toPromise();
    const order = await this.pizzaService.saveOrder({customerId: customer.id, orderDate: new Date(), orderPizzas: this.cartItems$.value}).toPromise();
    this.pizzaService.clearCart();
    alert(order.id);
  }
}
