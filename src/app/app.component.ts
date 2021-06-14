import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PizzaService } from './shared/services/pizza.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  cartLength$ = this.pizzaService.cartItems$;
  constructor(private router: Router, private pizzaService: PizzaService) {
  }

  goto(url: string) {
    this.router.navigateByUrl(url);
  }
}
