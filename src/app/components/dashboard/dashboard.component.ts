import { Component, OnInit } from '@angular/core';
import { PizzaService } from 'src/app/shared/services/pizza.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isLoading = false;
  pizzaTypes = [];
  toppings = [];
  sizes = [];
  constructor(private pizzaService: PizzaService) { }

  async ngOnInit() {
    await this.getPizzaTypes();
  }

  private async getPizzaTypes() {
    this.isLoading = true;
    const pizzaData = await this.pizzaService.getPizzaData().toPromise();
    this.pizzaTypes = pizzaData.pizzaTypes;
    this.toppings = pizzaData.toppings;
    this.isLoading = false;
  }

}
