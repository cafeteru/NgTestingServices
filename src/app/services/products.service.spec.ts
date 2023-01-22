import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../environments/environment';
import { Product } from '../models/product.model';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getAll', () => {
    it('should return a product list', (doneFn) => {
      // Mocks the products.
      const mockProducts: Product[] = [
        {
          id: '2',
          title: 'Product 1',
          price: 100,
          images: ['image1.jpg', 'image2.jpg'],
          description: 'Description 1',
          category: {
            id: 1,
            name: 'Category 1',
          },
          taxes: 0.19,
        },
        {
          id: '2',
          title: 'Product 2',
          price: 200,
          images: ['image1.jpg', 'image2.jpg'],
          description: 'Description 2',
        }
      ];

      // Calls the service.
      service.getAllSimple().subscribe(products => {
        expect(products.length).toBe(mockProducts.length);
        expect(products).toEqual(mockProducts);
        doneFn();
      });

      // Mocks the request.
      const url = `${service.apiUrl}/products`;
      const req = httpTestingController.expectOne(url); // Verifies that the request is made to the correct URL.
      req.flush(mockProducts); // Returns the mock products.
      httpTestingController.verify(); // Verifies that no requests are outstanding.
    });
  });
});
