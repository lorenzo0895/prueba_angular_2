import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '@shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _url = 'https://fakestoreapi.com';

  constructor(private _http: HttpClient) {}

  getData(category: string, limit: number) {
    // https://fakestoreapi.com/products
    // https://fakestoreapi.com/products/category/{category}
    const url = category === 'all'
      ? `${this._url}/products` 
      : `${this._url}/products/category/${category}`
    return this._http.get<Product[]>(`${url}?limit=${limit}`);
  }
}
