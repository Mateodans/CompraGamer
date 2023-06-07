import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBadge } from '@angular/material/badge';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css'],
  providers: [CurrencyPipe]
})
export class SubcategoriasComponent implements OnInit {
  subCategory_id: string|null = null;
  subCategory: string|null = null;
  products: any[] = [];
  cartItems: any[] = [];
  images: any[] = [];
  precioMaximo: number = 10000;
  currencyPipe: CurrencyPipe
  menu: any;
  public page!: number;

  @Input() subCategories: any[] = [];

  @Output() subCategoriaSeleccionada: EventEmitter<any> = new EventEmitter<any>();
  constructor(private apiService: ApiService, private route: ActivatedRoute, currencyPipe: CurrencyPipe, private snackBar: MatSnackBar) {
    this.currencyPipe = currencyPipe;
   }

  seleccionarSubcategoria(subCategoria: any) {
    this.subCategoriaSeleccionada.emit(subCategoria);
  }

  calcularPrecioConIVA(products: any) {
    const precio = products.precio;
    const iva = products.iva;
    const montoIVA = (precio * iva) / 100;
    const precioConIVA = precio + montoIVA;
    return precioConIVA;
  }
  addToCart(product : any){
    const producto = product;
    const url = 'https://static.compragamer.com/test/productos.jsonAPI';
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


  ngOnInit(): void {
    this.subCategory_id = this.route.snapshot.paramMap.get('id')
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
        this.products = data.filter((product: any) => {
          if (product.id_subcategoria == this.subCategory_id){
            this.apiService.getImage(product.nombre, product.imagenes[0].nombre).subscribe(
              (data2: any)=>{
                this.images.push(data2)
              }
            );

          return {
            ...product,
            precioConIVA: this.calcularPrecioConIVA(product)
          };
        }
      });
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

}
