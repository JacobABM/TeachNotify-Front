import { Component, OnInit } from '@angular/core';
import { GrupoI } from '../models/grupo-i';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MensajesService } from '../services/cruds/mensajes.service';
import { AuthService } from '../services/auth.service';
import { MensajeI } from '../models/mensajes-i';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  visiblebtn:boolean = false;
  grupos:any
  grupo!:GrupoI
  user:any
  mensajes!:MensajeI
  visible:boolean=false
  grupoform!:FormGroup
  constructor(private mensajesservice:MensajesService,private fb:FormBuilder,private authservice:AuthService,private router:Router,private cookieservice:CookieService)
  {
      this.createForm()
  }

  ngOnInit(): void {
      this.getUser();
      this.checkUser();
      this.getGrupos();
  }
  getGrupos(){
      this.mensajesservice.get().subscribe((data:any)=>{
          this.grupos=data;
          console.log(this.grupos)
      })
  }
  createForm(){
      this.grupoform=this.fb.group({
          Nombre_Grupo:""
      })
  }
  setMensaje(){
      this.mensajes={
        id_grupo: this.cookieservice.get("Grupo"),
        mensaje:this.user+" "+"se ha unido a la conversacion"
      }
  }
  getUser():void{
    this.authservice.checkID().subscribe((data:any)=>{
      this.user=data.Nombre
    })
  }
  checkUser(): void {
    this.authservice.checkRole().subscribe((data:any)=>{
      this.visiblebtn = data
    })
  }
  verMensajesAlumno(id):void{
      this.cookieservice.set('Grupo',id)
      this.setMensaje()
      this.mensajesservice.agregarMongo(this.mensajes).subscribe((data:any)=>{
          console.log(data)
      })
      this.router.navigate(["mensajegrupo"]);
  }
  verMensajesProfesor(id):void{
      this.cookieservice.set('Grupo',id)
      this.setMensaje()
      this.mensajesservice.agregarMongo(this.mensajes).subscribe((data:any)=>{
        console.log(data)
      })
      this.router.navigate(["mensajegrupo"]);
  }
  agregar(){
      this.setGrupo();
      this.mensajesservice.agregar(this.grupo).subscribe((data:any)=>{
          console.log("Se agrego correctamente")
      })
      this.grupoform.reset();
  }
  mostrarAgregar(){
      this.visible=!this.visible
  }
  displayedColumns: string[] = ['Nombre del Grupo','Actions'];
  setGrupo():void{
    this.grupo = {
      Nombre_Grupo: this.grupoform.get('Nombre_Grupo')?.value,
    }
  }
}
