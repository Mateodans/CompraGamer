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
  borrarItem(product: any){
    var currentCartInStorage = JSON.parse(localStorage.getItem('cart')!)
    var nuevosItems = currentCartInStorage.filter((item:any) => item.id !== product.id);
  localStorage.setItem('cart', JSON.stringify(nuevosItems));
  this.cartItems = nuevosItems;
  }
  ngOnInit(): void {
    if (localStorage.getItem('cart') != null){
      this.cartItems = JSON.parse(localStorage.getItem('cart')!)
    }
    window.addEventListener('storage', this.actualizarCarrito);
  }

  ngOnDestroy(): void {
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
  };
}
