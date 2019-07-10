import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
    selector: 'app-parameter',
    templateUrl: './parameter.component.html' 
  })
export class ParameterComponent implements OnInit {

    private orderValue: string = ''
    private dataTable: any = []
    private results: any = []
    private pager :  any = []
    private currentPage : number
   
    ngOnInit() {
    }
  
    constructor(private router: Router, private activeRoute : ActivatedRoute, private apiService: ApiService) {
      activeRoute.queryParams.subscribe(x =>{
        this.orderValue = x['ordenar'];
        let page =  x['page'] || 1;
        if(this.orderValue != undefined){
          this.getByParam(this.orderValue,page);
          this.dataTable = []
          this.results = []
          this.pager = []
        }
      });
    }


    async getByParam(name: string , page: number) {
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
              
              if(people.mass == 'unknown'){
                 people.mass = 0;
              }else{
                 people.mass = parseInt(people.mass);
              }

              if(people.height == 'unknown'){
                people.height = 0;
              }else{
                people.height = parseInt(people.height);
              }

              people.homeworld = dataTmp.name;
              this.results.push(people);
            }
            
            switch(name) {
              case 'peso':
                this.dataTable = this.results.sort((a, b) => a.mass - b.mass)
                break;
              case 'altura':
                this.dataTable = this.results.sort((a, b) => a.height - b.height)
                break;
              case 'nombre':
                this.dataTable = this.results.sort((a, b) => {
                  if (a.name < b.name ) { return -1 }
                  if (a.name > b.name ) { return 1 }
                  return 0
                })
                break;
              default:
                this.dataTable = this.results;
                break;
            }
          }
        } catch(error) {
          console.error(error)
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