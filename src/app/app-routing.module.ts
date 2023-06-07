import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SubcategoriasComponent } from './components/subcategorias/subcategorias.component';
import { WelcomeComponent } from './components/welcome/welcome.component';



const routes: Routes = [
  { path: 'app-register', component: RegistroUsuarioComponent },
  { path: 'app-product-list', component: ProductListComponent},
  { path: 'app-subcategories', component: SubcategoriasComponent},
  { path: '', component: WelcomeComponent },
  { path: 'carrito', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
