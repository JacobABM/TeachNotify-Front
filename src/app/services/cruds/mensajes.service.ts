import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { GrupoI } from 'src/app/models/grupo-i';
import { MensajeI } from 'src/app/models/mensajes-i';
import { Observable, Subject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MensajesService {
    apiURL=environment.apiURL

    refresh$ = new Subject<void>();
    constructor(private http:HttpClient) { }
    get():Observable<any>{
      return this.http.get(`${this.apiURL}/verGrupos/:request`);
    }
    agregar(grupo:GrupoI):Observable<any>{
        return this.http.post(`${this.apiURL}/guardarGrupo/:request`,grupo)
        .pipe(
            tap(()=>{
                this.refresh$.next();
            })
        )
    }
    agregarMongo(mensaje:MensajeI):Observable<any>{
      return this.http.post(`${this.apiURL}/abrirConversacion/:request`, mensaje)
    }
    agregarComentario(mensaje:MensajeI):Observable<any>{
        return this.http.put(`${this.apiURL}/guardarMensaje/:request`,mensaje)
        .pipe(
          tap(()=>{
            this.refresh$.next();
          })
        )
    }
    getComentarios(id):Observable<any>{
      return this.http.get(`${this.apiURL}/getMensajes/${id}`)
    }

}
