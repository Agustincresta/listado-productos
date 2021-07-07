import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    public productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts();
    this.resetForm()
  }

  onSubmit(productForm: NgForm){
    if (productForm.value.$key == null) {
      this.productService.insertProduct(productForm.value),
      this.resetForm(productForm)
    }else{
    this.productService.updateProduct(productForm.value),
    this.resetForm(productForm);
    
    }
    this.toastr.success('Operacion completada', 'Operacion completada')
  }

  resetForm(productForm?: NgForm){
    if (productForm != null) {
      productForm.reset();
      this.productService.selectedProduct = new Product();
    }
  }

}
