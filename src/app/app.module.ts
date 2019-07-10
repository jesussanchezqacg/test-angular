import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from 'src/startwars/service/api.service';
import { FormsModule }   from '@angular/forms';
import { NavbarComponent } from './template/navbar/navbar.component';
import { PeopleComponent } from 'src/startwars/people/people.component';
import { ParameterComponent } from 'src/startwars/parameters/parameter.component';
import { ResidentComponent } from 'src/startwars/residents/resident.component';
import { JwPaginationComponent } from 'jw-angular-pagination';

@NgModule({
  declarations: [
    AppComponent, 
    PeopleComponent,
    ParameterComponent,
    ResidentComponent,
    JwPaginationComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule      
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
