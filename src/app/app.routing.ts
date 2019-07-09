import { ModuleWithProviders, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './views/inicio/inicio.component';
import { PersonajeComponent } from './views/personaje/personaje.component';
import { PersonajesComponent } from './views/personajes/personajes.component';
import { ResidentesComponent } from './views/residentes/residentes.component';

const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'personaje', component: PersonajeComponent},
    {path: 'personajes', component: PersonajesComponent},
    {path: 'residentes', component: ResidentesComponent},
    {path: '**', component: InicioComponent}
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);