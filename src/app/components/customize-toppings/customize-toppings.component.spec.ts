import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {MockService} from 'ng-mocks';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { MasterSize } from 'src/app/shared/models/master-size.model';
import { Pizza } from 'src/app/shared/models/pizza.model';
import { PizzaService } from 'src/app/shared/services/pizza.service';

import { CustomizeToppingsComponent } from './customize-toppings.component';

describe('CustomizeToppingsComponent', () => {
  let component: CustomizeToppingsComponent;
  let fixture: ComponentFixture<CustomizeToppingsComponent>;
  let pizzaService: PizzaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeToppingsComponent ],
      imports: [FormsModule, ModalModule],
      providers: [{provide: PizzaService, useValue: MockService(PizzaService)}, BsModalRef]
    })
    
    .overrideTemplate(CustomizeToppingsComponent, '<div></div>')
    .compileComponents();
  }));

  beforeEach(() => {
    pizzaService = TestBed.get(PizzaService);
    fixture = TestBed.createComponent(CustomizeToppingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal for customize', async() => {
    const pizza = new Pizza();
    component.pizza = pizza;
    component.updateSize({id: 2, name: 'Medium'});
    expect(component.pizza.price).toBe(140);
  });

  it('should toggle topping when added and removed', async() => {
    const pizza = new Pizza();
    component.pizza = pizza;
    component.toggleTopping({id: 1, name: 'Onion', price: 7});
    expect(component.pizza.price).toBe(127);
    component.toggleTopping({id: 2, name: 'Capsicum', price: 14});
    expect(component.pizza.price).toBe(141);
    component.toggleTopping({id: 1, name: 'Onion', price: 7});
    expect(component.pizza.price).toBe(134);
  });

  it('should add to cart', () => {
    spyOn(pizzaService, 'addToCart');
    component.addToCart();
    expect(pizzaService.addToCart).toHaveBeenCalled();
    component.bsModalRef = null;
    component.addToCart();
    expect(pizzaService.addToCart).toHaveBeenCalled();
  }); 
});
