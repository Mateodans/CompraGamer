import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SubcategoriasComponent } from './components/subcategorias/subcategorias.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


const routes: Routes = [
  { path: 'app-register', component: RegistroUsuarioComponent },
  { path: 'app-product-list', component: ProductListComponent },
  { path: 'app-subcategories', component: SubcategoriasComponent},
  { path: '', component: WelcomeComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    RegistroUsuarioComponent,
    HeaderComponent,
    SubcategoriasComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
