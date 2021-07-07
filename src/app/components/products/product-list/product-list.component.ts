import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList!: Product[];
  prod!: any | null;
  constructor( 
      public productService: ProductService,
      private toastr: ToastrService
    ) { }

  ngOnInit(): void {
    this.productService.getProducts()
        .snapshotChanges()
        .subscribe(item => {
          this.productList = [];
          item.forEach(element => {
            this.prod = element.payload.toJSON();
            this.prod["$key"] = element.key;
            this.productList.push(this.prod as Product);
          });
        });
  }

  onEdit(product: Product){
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDelete($key: string){
    this.productService.deleteProduct($key);
    if (confirm('¡Estas seguro de querer borrarlo?')) {
      this.toastr.success('operacion completada', "Producto eliminado")
    }
  }

}
