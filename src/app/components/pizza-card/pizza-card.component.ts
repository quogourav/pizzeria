import { Component, Input, OnInit } from '@angular/core';
import { MasterSize } from 'src/app/shared/models/master-size.model';
import { Pizza } from 'src/app/shared/models/pizza.model';
import { PizzaService } from 'src/app/shared/services/pizza.service';
import { CustomizeToppingsComponent } from '../customize-toppings/customize-toppings.component';
import { BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-pizza-card',
  templateUrl: './pizza-card.component.html',
  styleUrls: ['./pizza-card.component.scss']
})
export class PizzaCardComponent implements OnInit {

  @Input() pizzaType: any;  
  @Input() pizza: Pizza;
  @Input() selectionView = false;

  sizes$ = this.pizzaService.getPizzaSizes();
  selectedSizeId: number;
  imageId= Math.floor(Math.random() * 4) + 1;
  constructor(private pizzaService: PizzaService, private modalService: BsModalService) {
    
  }

  ngOnInit() {
    if(!this.pizza && this.pizzaType) {
      this.pizza = new Pizza(this.pizzaType.name);
    }
    
    this.selectedSizeId = this.pizza && this.pizza.sizeId;
  }

  async onSizeChange() {
    const size = (await this.sizes$.toPromise()).find(x=>x.id === this.selectedSizeId);
    this.pizza.updateSize(size.id, size.name);
  }

  addToCart() {
    this.pizzaService.addToCart(this.pizza);
  }

  customizePizza() {
    const initialState = {
      pizza: this.pizza,
      displayAsModal: true
    }
    const modalRef = this.modalService.show(CustomizeToppingsComponent, {initialState, 
      keyboard: false, backdrop: false, ignoreBackdropClick: true, class: 'modal-lg'});
  }

}
