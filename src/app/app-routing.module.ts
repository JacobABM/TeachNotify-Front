import { _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainComponent } from './components/main/main.component';
import { VigilantGuardService } from './services/guards/vigilant-guard.service';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MensajesGrupoComponent } from './mensajes-grupo/mensajes-grupo.component';
const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'mensajes',canActivate:[VigilantGuardService],component:MensajesComponent},
  {path:'register',component: RegisterComponent},
  {path:'mainadmin', canActivate:[VigilantGuardService], component: MainComponent},
  {path:'mensajegrupo', canActivate:[VigilantGuardService], component: MensajesGrupoComponent},
  {path:'**', redirectTo: '/login'},
  {path:'', redirectTo:'/login', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
