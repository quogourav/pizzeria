import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Pizza } from '../models/pizza.model';
import { Topping } from '../models/topping.model';
import { MasterSize } from '../models/master-size.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  private pizzaTypes: any[];
  private sizes: MasterSize[];
  private toppings: Topping[];

  private cart: Pizza[] = [];
  cartItems$ = new BehaviorSubject<number>(0);
  cartTotal$ = new BehaviorSubject<number>(0);
  cartPizzas$ = new BehaviorSubject<Pizza[]>(this.cart);

  constructor(private http: HttpClient) { }

  addToCart(pizza: Pizza) {
    this.cart.push(_.cloneDeep(pizza));
    this.cartItems$.next(this.cart.length);
    this.cartTotal$.next(this.getCartTotal());
    this.cartPizzas$.next(this.cart);
  }

  clearCart() {
    this.cart = [];
    this.cartItems$.next(this.cart.length);
    this.cartTotal$.next(this.getCartTotal());
    this.cartPizzas$.next(this.cart);
  }

  saveOrder(order: any) {
    return this.http.post<any>(environment.baseURL + 'order', order);
  }

  getPizzaData() {
    return forkJoin([this.getPizzaTypes(), this.getPizzaSizes(), this.getToppings()]).pipe(map(results => {
      this.pizzaTypes = results[0];
      this.sizes = results[1];
      this.toppings = results[2];
      return {pizzaTypes: this.pizzaTypes, sizes: this.sizes, toppings: this.toppings}
    }));
  }

  private getPizzaTypes(){
    if(this.pizzaTypes && this.pizzaTypes.length) {
      return of(this.pizzaTypes);
    } 
    return this.http.get(environment.baseURL + "masterdata/pizzas").pipe(tap((res: any[]) => {
        this.pizzaTypes = res;
    }));
  }

  getPizzaSizes(){
    if(this.sizes && this.sizes.length) {
      return of(this.sizes);
    } 
    return this.http.get(environment.baseURL + "masterdata/sizes").pipe(tap((res: any[]) => {
        this.sizes = res;
    }));
  }  

  getToppings(){
    if(this.toppings && this.toppings.length) {
      return of(this.toppings);
    } 
    return this.http.get(environment.baseURL + "masterdata/toppings").pipe(tap((res: any[]) => {
        this.toppings = res;
    }));
  }

  private getCartTotal() {
    return this.cart.reduce((acc, pizza) => {
      return acc + pizza.price;
    }, 0);
  }
}
