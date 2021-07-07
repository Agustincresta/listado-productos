import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList!: AngularFireList<any>;
  selectedProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase) { }

  getProducts(){
    return this.productList = this.firebase.list('products')
  }

  insertProduct(product: Product){
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    })
  }

  updateProduct(product: Product){
    this.productList.update(product.$key, {
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
    });
  }

  deleteProduct($key: string){
    this.productList.remove($key)
  }
}
