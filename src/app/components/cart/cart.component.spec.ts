import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CustomerService } from 'src/app/shared/services/customer.service';
import { PizzaService } from 'src/app/shared/services/pizza.service';
import { PizzaCardComponent } from '../pizza-card/pizza-card.component';
import {MockService} from 'ng-mocks';

import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { Pizza } from 'src/app/shared/models/pizza.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let router: Router;
  let customerService: CustomerService;
  let pizzaService: PizzaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent, PizzaCardComponent ],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: PizzaService, useValue: MockService(PizzaService)}, 
        {provide: CustomerService, useValue: MockService(CustomerService)}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    customerService = TestBed.get(CustomerService);
    pizzaService = TestBed.get(PizzaService);
    Object.defineProperty(pizzaService, 'cartItems$', { value: new BehaviorSubject<Pizza[]>([]) });
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    Object.defineProperty(component, 'cartItems$', { value: new BehaviorSubject<Pizza[]>([]) });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to another page', () => {
    spyOn(router, 'navigateByUrl');
    component.goto('/home');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
  });

  it('should save order', async () => {
    spyOn(customerService, 'saveCustomer').and.returnValue(of({id: 1}));
    spyOn(pizzaService, 'saveOrder').and.returnValue(of({id: 1}));
    spyOn(pizzaService, 'clearCart');
    component.saveOrder();
    expect(customerService.saveCustomer).toHaveBeenCalled();
  });
});
