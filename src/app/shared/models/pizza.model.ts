import { Topping } from "./topping.model";

export class Pizza {
    private basePrice = 100;
    name: string;
    masterToppings: Topping[] = [];
    toppings: string[] = [];
    price: number;
    sizeId: number = 1;
    size: string = "Small";

    constructor(name?: string) {
        this.name = name;
        this.updatePrice();
    }

    updatePrice() {
        this.price = this.basePrice + (this.sizeId * 20) + (this.masterToppings.reduce((prev, topping)=> {
            return prev + topping.price
          }, 0));
    }

    updateSize(id: number, size: string) {
        this.sizeId = id;
        this.size = size;
        this.updatePrice();
    }

    addTopping(topping: Topping) {
        this.masterToppings.push(topping);
        this.toppings = this.masterToppings.map(x=> x.name);
        this.updatePrice();
    }

    removeTopping(topping: Topping) {
        this.masterToppings = this.masterToppings.filter(x => x.id !== topping.id);
        this.toppings = this.masterToppings.map(x=> x.name);
        this.updatePrice();
    }
}