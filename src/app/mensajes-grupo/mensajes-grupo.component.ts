import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { interval, Subscription } from 'rxjs';
import { MensajeI } from '../models/mensajes-i';
import { MensajesService } from '../services/cruds/mensajes.service';
@Component({
  selector: 'app-mensajes-grupo',
  templateUrl: './mensajes-grupo.component.html',
  styleUrls: ['./mensajes-grupo.component.css']
})
export class MensajesGrupoComponent implements OnInit {
  mensajeForm!:FormGroup
  mensajes:any
  user:any
  visible:Boolean=false
  mensaje!:MensajeI
  constructor(private cookieservice:CookieService,private mensajeservice:MensajesService,private fb:FormBuilder, private authService:AuthService) {
      this.createForm();
      const contador=interval(3000)
      contador.subscribe(()=>{
          this.mensajeservice.getComentarios(this.cookieservice.get('Grupo')).subscribe((data:any)=>{
              this.mensajes=data[0].mensajes
          })
      })
   }

  ngOnInit(): void {
      this.getUser()
      this.checkUser()
  }
  agregar():void{
      this.setMensaje()
      this.mensajeservice.agregarComentario(this.mensaje).subscribe((data:any)=>{
          console.log(data)
      })
      this.mensajeForm.reset()
  }
  checkUser(){
    this.authService.checkRole().subscribe((data:any)=>{
        this.visible=data
    })
  }
  getUser(){
      this.authService.checkID().subscribe((data:any)=>{
          this.user=data.Nombre
      })
  }
  createForm(): void {
    this.mensajeForm = this.fb.group({
      mensaje:[''],
    })
  }
  setMensaje(){
      this.mensaje={
        id_grupo:this.cookieservice.get('Grupo'),
        mensaje: this.user + ":" + " " + this.mensajeForm.get('mensaje')?.value
      }
  }

}
