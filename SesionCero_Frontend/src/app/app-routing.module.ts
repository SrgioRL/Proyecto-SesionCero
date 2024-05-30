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
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: HomeComponent },
  { path: 'crear', component: FormComponent, canActivate: [AuthGuard] },
  {
    path: 'todos/:idJugador',
    component: AllpjComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'jugador/:idJugador',
    component: JugadorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'personaje/:idPersonaje',
    component: PersonajeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'todos', component: AllpjComponent, canActivate: [AuthGuard] },
  {
    path: 'recursos',
    component: DocumentosComponent,
    canActivate: [AuthGuard],
  },
  { path: 'error', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
