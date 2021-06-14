import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { PizzaService } from './shared/services/pizza.service';
import {MockService} from 'ng-mocks';
import { Router } from '@angular/router';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{provide: PizzaService, useValue: MockService(PizzaService)}]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should navigate to another page', () => {
    let router = TestBed.get(Router);
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    spyOn(router, 'navigateByUrl');
    app.goto('/home');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
  });
});
