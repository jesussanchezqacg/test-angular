import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
    selector: 'app-people',
    templateUrl: './people.component.html' 
  })
export class PeopleComponent implements OnInit {

    private person: any = null;
    private name: string = '';
    private param: string = 'people';
    private dataTable: any = [];
    
    ngOnInit() {
    }
  
    constructor(private router: Router, private apiService: ApiService) {
    }

    getName(event){
        if(event.target.value != '') {
          this.person = null;
          this.getData(event.target.value);
        }
        this.dataTable = [];
    }

    async getData(name) {
        try {
          const data: any = await this.apiService.getPeople(name).toPromise();
          if(data.results.length > 0){
            this.person = data.results[0];
            this.getPlanet(this.person.homeworld);
          }
        } catch (error) {
          console.error('error', error);
        }
      }

      async getPlanet(url:string) {
        try {
          const data: any =  await this.apiService.getById(url).toPromise();
          this.person.homeworld = data.name;
        } catch (error) {
          console.error('error', error);
        }
      }

}