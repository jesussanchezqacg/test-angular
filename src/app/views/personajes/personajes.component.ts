import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'personajes',
  templateUrl: './personajes.component.html',
  providers: [AppService]
})
export class PersonajesComponent {
  
  public title:string;
  public peoples:Array<any>;
  public planet:string;

  constructor(public _appService: AppService) {
      this.title = "Personajes de Star Wars";
      this.peoples = new Array();
  }

  ngOnInit() {
    this.getAllPeople();
  }

  getAllPeople() {
    this._appService.findAllPeople().subscribe(
      result => {
        console.log(result);
        this.peoples = new Array();
        for(let people of result.results) {
          this._appService.findObjectByUrl(people.homeworld).subscribe(
            result => {
              people.homeworld = result;
              this.peoples.push(people);
            },
            error => {
                this.peoples.push(people);
                console.log(error);
            }
          );
        }
      },
      error => {
          console.log(error);
      }
    );
  }

  sortName() {
    this.peoples.sort((itemA, itemB) => {
      let a = itemA.name.toUpperCase();
      let b = itemB.name.toUpperCase();
      console.log(a, " compare ", b);
      return a > b ? 1 : b > a ? -1 : 0;
    });
  }

  sortHeight() {
    this.peoples.sort((itemA, itemB) => {
      let a = itemA.height;
      let b = itemB.height;
      console.log(a, " compare ", b);
      return a > b ? 1 : b > a ? -1 : 0;
    });
  }

  sortMass() {
    this.peoples.sort((itemA, itemB) => {
      let a = itemA.mass;
      let b = itemB.mass;
      console.log(a, " compare ", b);
      return a > b ? 1 : b > a ? -1 : 0;
    });
  }
}