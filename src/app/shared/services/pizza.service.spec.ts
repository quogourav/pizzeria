import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PizzaService } from './pizza.service';
import { environment } from 'src/environments/environment';
import { Pizza } from '../models/pizza.model';
import { MasterSize } from '../models/master-size.model';
import { forkJoin } from 'rxjs';

describe('PizzaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: PizzaService = TestBed.get(PizzaService);
    expect(service).toBeTruthy();
  }); 

  it('be able to addOrUpdate Order with the API via Post', () => {
    const service: PizzaService = TestBed.get(PizzaService);
    const httpMock = TestBed.get(HttpTestingController);
    const dummyResponse: any = {id: 1, name: 'Test', email: 'abc@abc.com', phone: '97448548'};
    service.saveOrder({}).subscribe(interaction => {
      expect(interaction).toEqual(dummyResponse);
    });
    const request = httpMock.expectOne(`${environment.baseURL}order`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyResponse);
  });

  it('be able to get pizza data with the API via Get', () => {
    const service: PizzaService = TestBed.get(PizzaService);
    const httpMock = TestBed.get(HttpTestingController);
    const pizzaTypes = [{id: 1, name: 'New York'}];
    const sizes = [{id: 1, name: "Small"}];
    const toppings =[{id: 1, name: "Cheese"}];
    const dummyResponse: any ={pizzaTypes, sizes, toppings };
    service.getPizzaData().subscribe(interaction => {
      expect(interaction).toEqual(dummyResponse);
    });
    const reqPizzas = httpMock.expectOne(`${environment.baseURL}masterdata/pizzas`);
    const reqSizes = httpMock.expectOne(`${environment.baseURL}masterdata/sizes`);
    const reqToppings = httpMock.expectOne(`${environment.baseURL}masterdata/toppings`);
    expect(reqPizzas.request.method).toBe('GET');    
    expect(reqSizes.request.method).toBe('GET');    
    expect(reqToppings.request.method).toBe('GET');
    const e1 = forkJoin([reqPizzas, reqSizes, reqToppings]);
    reqPizzas.flush(pizzaTypes);
    reqSizes.flush(sizes);
    reqToppings.flush(toppings);
    service.getPizzaData().subscribe(interaction => {
      expect(interaction).toEqual(dummyResponse);
    });
  });

  it('should able to insert and delete in cart', () => {
    const service: PizzaService = TestBed.get(PizzaService);
    service.addToCart(new Pizza('New York'));
    expect(service.cartItems$.value).toBe(1);
    expect(service.cartTotal$.value).toBe(120);
    expect(service.cartPizzas$.value.length).toBe(1);
    service.clearCart();
    expect(service.cartItems$.value).toBe(0);
    expect(service.cartTotal$.value).toBe(0);
    expect(service.cartPizzas$.value.length).toBe(0);
  });
});
