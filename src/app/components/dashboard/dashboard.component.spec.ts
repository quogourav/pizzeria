import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PizzaService } from 'src/app/shared/services/pizza.service';
import { PizzaCardComponent } from '../pizza-card/pizza-card.component';
import {MockService} from 'ng-mocks';

import { DashboardComponent } from './dashboard.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let pizzaService: PizzaService

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent, PizzaCardComponent ],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [{provide: PizzaService, useValue: MockService(PizzaService)}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    pizzaService = TestBed.get(PizzaService);
    spyOn(pizzaService,'getPizzaData').and.returnValue(of({sizes: [], pizzaTypes:[], toppings: []}))
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
