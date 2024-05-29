import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { AllpjComponent } from './allpj/allpj.component';
import { JugadorComponent } from './jugador/jugador.component';
import { PersonajeComponent } from './personaje/personaje.component';
import { HomeComponent } from './home/home.component';
import { DocumentosComponent } from './documentos/documentos.component';
import { AuthService } from './services/auth.service';
import { DownloadService } from './services/download.service';
import { ErrorComponent } from './error/error.component'; 


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NavComponent,
    LoginComponent,
    FooterComponent,
    SignupComponent,
    AllpjComponent,
    JugadorComponent,
    PersonajeComponent,
    HomeComponent,
    DocumentosComponent,
    ErrorComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, DownloadService],
  bootstrap: [AppComponent],
})
export class AppModule {}
