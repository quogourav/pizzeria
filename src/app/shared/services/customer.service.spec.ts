import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]}));

  it('should be created', () => {
    const service: CustomerService = TestBed.get(CustomerService);
    expect(service).toBeTruthy();
  });  

  it('be able to addOrUpdate Customer with the API via Post', () => {
    const service: CustomerService = TestBed.get(CustomerService);
    const httpMock = TestBed.get(HttpTestingController);
    const dummyResponse: any = {id: 1, name: 'Test', email: 'abc@abc.com', phone: '97448548'};
    service.saveCustomer('Test', 'abc@abc.com', '97448548').subscribe(interaction => {
      expect(interaction).toEqual(dummyResponse);
    });
    const request = httpMock.expectOne(`${environment.baseURL}customer`);
    expect(request.request.method).toBe('POST');
    request.flush(dummyResponse);
  });
});
