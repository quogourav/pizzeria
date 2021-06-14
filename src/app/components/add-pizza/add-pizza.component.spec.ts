import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CustomizeToppingsComponent } from '../customize-toppings/customize-toppings.component';
import {MockService} from 'ng-mocks';
import { AddPizzaComponent } from './add-pizza.component';
import { PizzaService } from 'src/app/shared/services/pizza.service';

describe('AddPizzaComponent', () => {
  let component: AddPizzaComponent;
  let fixture: ComponentFixture<AddPizzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPizzaComponent, CustomizeToppingsComponent ],
      providers: [{provide: PizzaService, useValue: MockService(PizzaService)}],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPizzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
