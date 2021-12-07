import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstacionModelo } from 'src/app/modelos/estacion.model';
import { EstacionService } from 'src/app/servicios/estacion.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private estacionService: EstacionService,
    private router: Router,
    private route: ActivatedRoute) { 
  }

  fgValidacion = this.fb.group({
    id: [{value: '', disabled: true}, [Validators.required]],
    nombre: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    coordenadax: ['', [Validators.required]],
    coordenaday: ['', [Validators.required]],
    tipo: ['', [Validators.required]]
  });

  id: string=''

  buscarRegistro(id: string){
    this.estacionService.getWithId(id).subscribe((data: EstacionModelo) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["nombre"].setValue(data.nombre)
      this.fgValidacion.controls["direccion"].setValue(data.direccion)
      this.fgValidacion.controls["coordenadax"].setValue(data.coordenadax)
      this.fgValidacion.controls["coordenaday"].setValue(data.coordenaday)
      this.fgValidacion.controls["tipo"].setValue(data.tipo)
    })
  }

  edit(){
    let estacion = new EstacionModelo();
    estacion.id = this.fgValidacion.controls["id"].value;
    estacion.nombre = this.fgValidacion.controls["nombre"].value;
    estacion.direccion = this.fgValidacion.controls["direccion"].value;
    estacion.coordenadax = this.fgValidacion.controls["coordenadax"].value;
    estacion.coordenaday = this.fgValidacion.controls["coordenaday"].value;
    estacion.tipo = this.fgValidacion.controls["tipo"].value;
 
    this.estacionService.update(estacion).subscribe((data: EstacionModelo)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/estaciones/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }



  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

}
