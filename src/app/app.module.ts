import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { InicioComponent } from './views/inicio/inicio.component';
import { PersonajeComponent } from './views/personaje/personaje.component';
import { PersonajesComponent } from './views/personajes/personajes.component';
import { ResidentesComponent } from './views/residentes/residentes.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PersonajeComponent,
    PersonajesComponent,
    ResidentesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }