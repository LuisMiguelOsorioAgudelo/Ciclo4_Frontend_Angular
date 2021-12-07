import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstacionModelo } from '../modelos/estacion.model';
import { SeguridadService } from './seguridad.service';


@Injectable({
  providedIn: 'root'
})
export class EstacionService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();
  }
  url = "http://localhost:3000"
  token: string = ''

  store(estacion: EstacionModelo): Observable<EstacionModelo> {
    return this.http.post<EstacionModelo>(`${this.url}/estacions`, {
      nombre: estacion.nombre,
      direccion: estacion.direccion,
      coordenadax: estacion.coordenadax,
      coordenaday: estacion.coordenaday,
      tipo: estacion.tipo
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  getAll(): Observable<EstacionModelo[]>{
    return this.http.get<EstacionModelo[]>(`${this.url}/estacions`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(estacion: EstacionModelo): Observable<EstacionModelo> {
    return this.http.patch<EstacionModelo>(`${this.url}/estacions/${estacion.id}`, {
      nombre: estacion.nombre,
      direccion: estacion.direccion,
      coordenadax: estacion.coordenadax,
      coordenaday: estacion.coordenaday,
      tipo: estacion.tipo
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<EstacionModelo[]>{
    return this.http.delete<EstacionModelo[]>(`${this.url}/estacions/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<EstacionModelo>{
    return this.http.get<EstacionModelo>(`${this.url}/estacions/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

}
