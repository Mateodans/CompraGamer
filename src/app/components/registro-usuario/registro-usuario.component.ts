import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})

export class RegistroUsuarioComponent {
  nombre: string = '';
  apellido: string = '';
  dni: string = '';
  correo: string = '';
  telefono: string = '';

  registroExitoso: boolean = false;

  showNotificationMessage() {
    this.registroExitoso = true;

    setTimeout(() => {
      this.hideNotificationMessage();
    }, 5000);
  }

  hideNotificationMessage() {
    this.registroExitoso = false;
  }

  constructor(private apiService: ApiService) {}

  onSubmit(form: NgForm) {
    const usuario = {
      nombre: this.nombre,
      apellido: this.apellido,
      dni: this.dni,
      correo: this.correo,
      telefono: this.telefono
    };
    if (form.invalid) {
      console.error("Algo inesperado sucedio")
      console.error("Error: " + Error);
    } else {
      this.apiService.guardarUsuario(usuario);
      this.registroExitoso = true;
      localStorage.setItem('usuario', JSON.stringify(usuario));
      setTimeout(() => {
        window.location.href = '/app-product-list';
      }, 2000);
    }
  }
}
