import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [CurrencyPipe]
})
export class HeaderComponent implements OnInit {
  isModalOpen: boolean = false;
  cartItems: any[] = [];
  currencyPipe: CurrencyPipe


  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar, currencyPipe: CurrencyPipe) {
    this.currencyPipe = currencyPipe
  }

  openModal(): void {
    this.isModalOpen = true
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  calcularPrecioConIVA(products: any) {
    const precio = products.precio;
    const iva = products.iva;
    const montoIVA = (precio * iva) / 100;
    const precioConIVA = precio + montoIVA;
    return precioConIVA;
  }

  addToCart() {
    // const products = {
    //   id: '',
    //   name: '',
    //   price: 10.99,
    //   Otros detalles del producto
    // };

    // const url = 'https://static.compragamer.com/test/productos.json';

    // const headers = new HttpHeaders().set('Content-Type', 'application/json');


    // this.http.post(url, products, { headers }).subscribe(
    //   () => {
    //     this.snackBar.open('El producto se ha añadido al carrito', 'Cerrar', {
    //       duration: 2000
    //     });
    //   },
    //   (error) => {
    //     console.error('Error al añadir al desplegar el carrito:', error);
    //     this.snackBar.open('Error al añadir al desplegar el carrito', 'Cerrar', {
    //       duration: 3000
    //     });
    //   }
    // );
  }
  //prueba
  ngOnInit(): void {
    // Suscribirse al evento de almacenamiento local para actualizar los items del carrito
    if (localStorage.getItem('cart') != null){
      this.cartItems = JSON.parse(localStorage.getItem('cart')!)
    }
    window.addEventListener('storage', this.actualizarCarrito);
  }

  ngOnDestroy(): void {
    // Eliminar la suscripción al evento de almacenamiento local al destruir el componente
    window.removeEventListener('storage', this.actualizarCarrito);
  }

  mostrarCarrito() {
    this.router.navigate(['/carrito']);
  }

  private actualizarCarrito = () => {
    if (localStorage.getItem('cart') != null){
      this.cartItems = JSON.parse(localStorage.getItem('cart')!)
      console.log(this.cartItems)
    }
    // Obtener los items del carrito desde el almacenamiento local
    // const items = JSON.parse(localStorage.getItem('cart') || '[]');
    // this.cartItems = items;

  };
}
