import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { FormComponent } from './form/form.component';
import { SignupComponent } from './signup/signup.component';
import { AllpjComponent } from './allpj/allpj.component';
import { JugadorComponent } from './jugador/jugador.component';
import { PersonajeComponent } from './personaje/personaje.component';  
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', component: HomeComponent},
  {path: 'crear', component: FormComponent},
  {path: 'todos/:idJugador', component: AllpjComponent},
  {path: 'jugador/:idJugador', component: JugadorComponent},
  {path: 'personaje/:idPersonaje', component: PersonajeComponent},
  {path: 'todos', component: AllpjComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
