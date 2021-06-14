import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  saveCustomer(name: string, email: string, phone: string) {
    return this.http.post<any>(environment.baseURL + 'customer', {name, email, phone});
  }
}
