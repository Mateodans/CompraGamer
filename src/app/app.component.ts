import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subcategorias: any[] = [];

  seleccionarSubcategoria(subCategoria: any) {
    console.log('Subcategoría seleccionada:', subCategoria);
  }
}
