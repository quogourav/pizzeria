import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { MasterSize } from 'src/app/shared/models/master-size.model';
import { Pizza } from 'src/app/shared/models/pizza.model';
import { Topping } from 'src/app/shared/models/topping.model';
import { PizzaService } from '../../shared/services/pizza.service';

@Component({
  selector: 'app-add-pizza',
  templateUrl: './add-pizza.component.html',
  styleUrls: ['./add-pizza.component.scss'],
  providers: [BsModalRef]
})
export class AddPizzaComponent implements OnInit {

  pizza: Pizza = new Pizza();
  constructor() { }

  ngOnInit() {
  }
}
