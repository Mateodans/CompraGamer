import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CurrencyPipe } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBadge } from '@angular/material/badge';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [CurrencyPipe]
})

export class ProductListComponent implements OnInit {
  cartItems: any[] = [];
  products: any[] = [];
  images: any[] = [];
  precioMaximo: number = 10000;
  public page!: number;
  currencyPipe: CurrencyPipe
  menu: any;
  @Input() subCategories: any[] = [];

  @Output() subCategoriaSeleccionada: EventEmitter<any> = new EventEmitter<any>();

  @Input()color: ThemePalette
  constructor(private apiService: ApiService, currencyPipe: CurrencyPipe, private snackBar: MatSnackBar, private http: HttpClient) {
    this.currencyPipe = currencyPipe;
  }

  addToCart(product : any){
    const producto = product;
    const url = 'https://static.compragamer.com/test/productos.jsonAPI';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    if (localStorage.getItem('cart') != null){

      this.cartItems = JSON.parse(localStorage.getItem('cart')!)

      this.cartItems.push(product)

      localStorage.setItem('cart', JSON.stringify(this.cartItems))

      console.log(this.cartItems)
    }
    else{
      this.cartItems.push(product)
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
    }
    window.dispatchEvent( new Event('storage') )

    this.snackBar.open('El producto se ha añadido al carrito', 'Cerrar', {
      duration: 3000
    });
  }
  esPrecioMasBarato(precio: number): boolean {
    return precio < this.precioMaximo;
  }

  seleccionarSubcategoria(subCategoria: any) {
    this.subCategoriaSeleccionada.emit(subCategoria);
  }

  getSubcategoriaNombre(id_subcategoria: number | string): string {
    if (this.subCategories && this.subCategories.length > 0) {
      const subCategory = this.subCategories.find(sub => sub.id === id_subcategoria);
      return subCategory ? subCategory.nombre : '';
    }
    return '';
  }

  calcularPrecioConIVA(products: any) {
    const precio = products.precio;
    const iva = products.iva;
    const montoIVA = (precio * iva) / 100;
    const precioConIVA = precio + montoIVA;
    return precioConIVA;
  }

  ngOnInit() {
    if (localStorage.getItem('cart') != null){
      this.cartItems = JSON.parse(localStorage.getItem('cart')!)

      console.log(this.cartItems)
    }
    this.apiService.getSubcategorias().subscribe(
      (data: any) => {
        this.subCategories = data;
      },
      (error: any) => {
        console.error('Error al obtener las subcategorías:', error);
      }
    );
    this.apiService.getProductos().subscribe(
      (data: any) => {
        this.products = data.map((product: any) => {
            this.apiService.getImage(product.nombre, product.imagenes[0].nombre).subscribe(
              (data2: any)=>{
                this.images.push(data2)
              }
            );

          return {
            ...product,
            precioConIVA: this.calcularPrecioConIVA(product)
          };
        });
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
}

