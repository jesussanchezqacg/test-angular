import { Component, Renderer2, HostListener } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'residentes',
  templateUrl: './residentes.component.html',
  providers: [AppService]
})
export class ResidentesComponent {

  @HostListener('window:mousemove', ['$event']) onClick(event) {
    this.sortHomeworld();
 }
  
  public title:string;
  public peoples:Array<any>;

  constructor(public _appService: AppService, private renderer: Renderer2) {
      this.title = "Residentes por planeta en Star Wars";
      this.peoples = new Array();
  }

  ngOnInit() {
    this.getAllPeople();
  }

  getAllPeople() {
    this._appService.findAllPeople().subscribe(
      result => {
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

  sortHomeworld() {
    console.log("loaded")
    this.peoples.sort((itemA, itemB) => {
      let a = itemA.homeworld.name.toUpperCase();
      let b = itemB.homeworld.name.toUpperCase();
      console.log(a, " compare ", b);
      return a > b ? 1 : b > a ? -1 : 0;
    });
  }
}