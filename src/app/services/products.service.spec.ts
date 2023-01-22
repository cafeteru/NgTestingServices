import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { generateOneProduct, generateManyProducts } from '../models/product.mock';
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

  describe('test for getAllSimple', () => {
    it('should return a product list created manually', (doneFn) => {
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

    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(20);

      service.getAllSimple()
        .subscribe((products) => {
          expect(products.length).toEqual(mockData.length);
          expect(products).toEqual(mockData);
          doneFn();
        });

      const url = `${service.apiUrl}/products`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockData);
      httpTestingController.verify();
    });
  });

  describe('test for getAll', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(20);

      service.getAll()
        .subscribe((products) => {
          expect(products.length).toEqual(mockData.length);
          doneFn();
        });

      const url = `${service.apiUrl}/products`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockData);
      httpTestingController.verify();
    });

    it('should return a product list with taxes', (doneFn) => {
      const mockData: Product[] = generateManyProducts(20);

      service.getAll()
        .subscribe((products) => {
          expect(products.length).toEqual(mockData.length);
          expect(products).not.toEqual(mockData);
          products.forEach((product) => {
            expect(product.taxes).toEqual(0.21 * product.price);
          });
          doneFn();
        });

      const url = `${service.apiUrl}/products`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockData);
      httpTestingController.verify();
    });

    it('should return a product list with taxes 0 when price is less 0', (doneFn) => {
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: -100,
        }
      ];

      service.getAll()
        .subscribe((products) => {
          expect(products.length).toEqual(mockData.length);
          expect(products[0].taxes).toEqual(0);
          doneFn();
        });

      const url = `${service.apiUrl}/products`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockData);
      httpTestingController.verify();
    });

    it('should send query params width limit 10 offset 3', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3);
      const limit = 10;
      const offset = 3;

      service.getAll(limit, offset)
        .subscribe((data) => {
          expect(data.length).toEqual(mockData.length);
          doneFn();
        });

      const url = `${service.apiUrl}/products?limit=${limit}&offset=${offset}`;
      const req = httpTestingController.expectOne(url);
      req.flush(mockData);
      const params = req.request.params;
      expect(params.get('limit')).toEqual(`${limit}`);
      expect(params.get('offset')).toEqual(`${offset}`);
      httpTestingController.verify();
    });
  });
});
