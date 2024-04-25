import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { AllpjComponent } from './allpj/allpj.component'; // Importar FormsModule

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NavComponent,
    LoginComponent,
    FooterComponent,
    SignupComponent,
    AllpjComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule // Agregar FormsModule aquí
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
