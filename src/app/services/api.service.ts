import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getSubcategorias(): Observable<any> {
    const url = 'https://static.compragamer.com/test/subcategorias.json';
      return this.http.get(url);
  }
  getProductos(): Observable<any> {
    const url = 'https://static.compragamer.com/test/productos.json';
    return this.http.get(url);
  }
  getImage(nombreProducto: string, nombreImagen: string): Observable<any> {
    const url = 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_'+nombreImagen+'-med.jpg';
    const image = [nombreProducto, url]
    return of(image);
  }
  guardarUsuario(usuario: any): Observable<any> {
    const usuariosGuardados = localStorage.getItem('usuarios');
    let usuarios: any[] = [];

    if (usuariosGuardados) {
      usuarios = JSON.parse(usuariosGuardados);
    }
    usuarios.push(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    return of(usuario).pipe(delay(1000));
  }
}
