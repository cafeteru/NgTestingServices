import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, zip } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

import { environment } from '../environments/environment';
import {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl = `${environment.API_URL}/api/v1`;

  constructor(private http: HttpClient) {}

  getByCategory(
    categoryId: string,
    limit?: number,
    offset?: number
  ): Observable<Product[]> {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(
      `${this.apiUrl}/categories/${categoryId}/products`,
      { params }
    );
  }

  getAllSimple(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getAll(limit?: number, offset?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params }).pipe(
      retry(3),
      map((products) =>
        products.map((item) => {
          return {
            ...item,
            taxes: item.price > 0 ? 0.21 * item.price : 0,
          };
        })
      )
    );
  }

  fetchReadAndUpdate(
    id: string,
    dto: UpdateProductDTO
  ): Observable<[Product, Product]> {
    return zip(this.getOne(id), this.update(id, dto));
  }

  getOne(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case HttpStatusCode.Conflict:
            return throwError(() => 'Algo esta fallando en el server');
          case HttpStatusCode.NotFound:
            return throwError(() => 'El producto no existe');
          case HttpStatusCode.Unauthorized:
            return throwError(() => 'No estas permitido');
          default:
            return throwError(() => 'Ups algo salio mal');
        }
      })
    );
  }

  create(dto: CreateProductDTO): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
