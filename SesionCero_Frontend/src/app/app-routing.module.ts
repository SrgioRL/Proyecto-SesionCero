import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import { SignupComponent } from './signup/signup.component';
import { AllpjComponent } from './allpj/allpj.component';
import { JugadorComponent } from './jugador/jugador.component';
import { PersonajeComponent } from './personaje/personaje.component';
import { HomeComponent } from './home/home.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomeComponent },
  { path: 'crear', component: FormComponent }, //Formulario para la creación de personaje
  { path: 'todos/:idJugador', component: AllpjComponent }, //Ver los personajes de un jugador
  { path: 'jugador/:idJugador', component: JugadorComponent }, //Ver detalle del jugador
  { path: 'personaje/:idPersonaje', component: PersonajeComponent }, //Ver detalle de un personaje
  { path: 'todos', component: AllpjComponent }, //Ver todos los jugadores
  { path: 'recursos', component: DocumentosComponent } , //Ver PDFs descargables
  { path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
