import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {


  @Input() subCategories: any[] = [];

  @Output() subCategoriaSeleccionada: EventEmitter<any> = new EventEmitter<any>();
  constructor(private apiService: ApiService) { }

  seleccionarSubcategoria(subCategoria: any) {
    this.subCategoriaSeleccionada.emit(subCategoria);
  }

  ngOnInit(): void {
    this.apiService.getSubcategorias().subscribe(
      (data: any) => {
        this.subCategories = data;
      },
      (error: any) => {
        console.error('Error al obtener las subcategorías:', error);
      }
    );
  }

}
