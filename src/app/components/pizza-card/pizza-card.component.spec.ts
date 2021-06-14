import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PizzaService } from 'src/app/shared/services/pizza.service';
import {MockService} from 'ng-mocks';

import { PizzaCardComponent } from './pizza-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { Pizza } from 'src/app/shared/models/pizza.model';
import { of } from 'rxjs';

describe('PizzaCardComponent', () => {
  let component: PizzaCardComponent;
  let fixture: ComponentFixture<PizzaCardComponent>;
  let modalService: BsModalService;
  let pizzaService: PizzaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaCardComponent ],
      imports: [FormsModule,  HttpClientTestingModule, ModalModule],
      providers: [
        {provide: PizzaService, useValue: MockService(PizzaService)}, 
        {provide: BsModalService, useValue: MockService(BsModalService)}
        ]
    })
    .overrideTemplate(PizzaCardComponent, '<div></div>')
    .compileComponents();
  }));

  beforeEach(() => {
    modalService = TestBed.get(BsModalService);
    pizzaService = TestBed.get(PizzaService);
    fixture = TestBed.createComponent(PizzaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create pizza if provides pizza type', () => {
    component.pizzaType = {id: 1, name: 'New York'};
    component.ngOnInit();
    expect(component.pizza).toBeDefined();
    expect(component.pizza.name).toEqual('New York');
  });

  it('should add to cart', () => {
    spyOn(pizzaService, 'addToCart');
    component.addToCart();
    expect(pizzaService.addToCart).toHaveBeenCalled();
  });  

  it('should open modal for customize', () => {
    spyOn(modalService, 'show');
    component.customizePizza();
    expect(modalService.show).toHaveBeenCalled();
  });

  it('should open modal for customize', async() => {
    const pizza = new Pizza();
    Object.defineProperty(component, 'sizes$', { value: of([{id: 1, name: 'Small'}]) });
    component.selectedSizeId = 1;
    component.pizza = pizza;
    component.onSizeChange();
    expect(component.pizza.price).toBe(120);
  });
});
