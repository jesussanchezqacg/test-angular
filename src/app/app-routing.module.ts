import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from 'src/startwars/people/people.component';
import { ParameterComponent } from 'src/startwars/parameters/parameter.component';
import { ResidentComponent } from 'src/startwars/residents/resident.component';


const routes: Routes = [
  { path: 'people', component: PeopleComponent },
  { path: 'parameter', component: ParameterComponent },
  { path: 'residents', component: ResidentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
