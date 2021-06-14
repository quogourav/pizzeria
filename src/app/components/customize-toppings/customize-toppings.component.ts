import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { MasterSize } from 'src/app/shared/models/master-size.model';
import { Pizza } from 'src/app/shared/models/pizza.model';
import { Topping } from 'src/app/shared/models/topping.model';
import { PizzaService } from 'src/app/shared/services/pizza.service';

@Component({
  selector: 'app-customize-toppings',
  templateUrl: './customize-toppings.component.html',
  styleUrls: ['./customize-toppings.component.scss']
})
export class CustomizeToppingsComponent implements OnInit {
  @Input() pizza: Pizza;
  displayAsModal = false;
  sizes$: Observable<MasterSize[]> = this.pizzaService.getPizzaSizes();
  toppings$: Observable<Topping[]> = this.pizzaService.getToppings();

  constructor(public bsModalRef: BsModalRef, private pizzaService: PizzaService) { }

  ngOnInit() {
  }

  updateSize(size: MasterSize) {
    this.pizza.updateSize(size.id, size.name);
  }

  toggleTopping(topping: Topping) {
    if(this.pizza.toppings.includes(topping.name)) {
      this.pizza.removeTopping(topping);
    } else {
      this.pizza.addTopping(topping);
    }
  }

  addToCart() {
    this.pizzaService.addToCart(this.pizza);
    if(this.bsModalRef) {
      this.bsModalRef.hide();
    }
    
  }

}
