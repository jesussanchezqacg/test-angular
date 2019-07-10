import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
    selector: 'app-resident',
    templateUrl: './resident.component.html' 
  })
export class ResidentComponent implements OnInit {

    private person: any = null;
    private name: string = '';
    private param: string = 'people';
    private dataTable: any = [];
    private results: any = [];
    private pager :  any = [];
    private currentPage : number;
    
    ngOnInit() {
    }
  
    constructor(private router: Router, private activeRoute: ActivatedRoute, private apiService: ApiService) {
      activeRoute.queryParams.subscribe(x => this.getByResident(x.page || 1));
      this.dataTable = []
      this.results = []
      this.pager = []
    }
    

    async getByResident(page : number) {
        try {
          this.dataTable = []
          const data: any = await this.apiService.getByPage(page).toPromise();
          this.pager = []
          this.currentPage = page;
          
          if(data.results.length > 0){
            for(let i = 1 ; i <= Math.ceil(data.count/10); i++ ){
              this.pager.push(i);
            }

            for(let people of data.results){
              const dataTmp: any =  await this.apiService.getById(people.homeworld).toPromise();
              people.homeworld = dataTmp.name;
              this.results.push(people);
              
            }
              
            this.dataTable = data.results.sort((a, b) => {
              if (a.homeworld < b.homeworld ) { return -1 }
              if (a.homeworld > b.homeworld ) { return 1 }
              return 0
            });
          }
        } catch(err) {
          console.error(err)
        }
        
      }

      nextPage(){
        let num : number = +this.currentPage;
        return num + 1;
      }

      previousPage(){
        let num : number = +this.currentPage;
        return num - 1;
      }

}