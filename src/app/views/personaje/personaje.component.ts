import { Component, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'personaje',
  templateUrl: './personaje.component.html',
  providers: [AppService]
})
export class PersonajeComponent {

  @ViewChild(NgForm, {static: true}) formPeople: NgForm;
  
  public title:string;
  public people:any;
  public searchPeople:any;
  public films:Array<any>;
  public species:Array<any>;
  public vehicles:Array<any>;
  public starships:Array<any>;

  constructor(public _appService: AppService) {
      this.title = "Búsqueda de Personaje de Star Wars";
      this.people = new Object();
      this.searchPeople = new Object();
      this.films = new Array();
      this.species = new Array();
      this.vehicles = new Array();
      this.starships = new Array();
  }

  ngOnInit() {
      this.checkValidate();
      this.formPeople.statusChanges.subscribe(x => {
        this.people = new Object();
        this.searchPeople = new Object();
        this.films = new Array();
        this.species = new Array();
        this.vehicles = new Array();
        this.starships = new Array();
      });
  }

  checkValidate() {
      window.addEventListener('load', function() {
          var forms = document.getElementsByClassName('needs-validation');
          var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
              if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add('was-validated');
            }, false);
          });
        }, false);
  }

  search() {
    this._appService.findPeopleByName(this.searchPeople.name).subscribe(
      result => {
        let people = result.results[0];
        if(people) {
          this.people = people;
          this.getPlanet(this.people.homeworld);
          for(let film of this.people.films) {
            this.getFilm(film);
          }
          for(let specie of this.people.species) {
            this.getSpecie(specie);
          }
          for(let vehicle of this.people.vehicles) {
            this.getVehicle(vehicle);
          }
          for(let starship of this.people.starships) {
            this.getStarships(starship);
          }
          this.people.films = this.films;
          this.people.species = this.species;
          this.people.vehicles = this.vehicles;
          this.people.starships = this.starships;
        } else {
          this.people = new Object();
        }
      },
      error => {
          console.log(error);
      }
    );
  }

  getPlanet(url:string) {
    this._appService.findObjectByUrl(url).subscribe(
      result => {
        this.people.homeworld = result;
      },
      error => {
          console.log(error);
      }
    );
  }

  getFilm(url:string) {
    this._appService.findObjectByUrl(url).subscribe(
      result => {
        this.films.push(result);
      },
      error => {
          console.log(error);
      }
    );
  }

  getSpecie(url:string) {
    this._appService.findObjectByUrl(url).subscribe(
      result => {
        this.species.push(result);
      },
      error => {
          console.log(error);
      }
    );
  }

  getVehicle(url:string) {
    this._appService.findObjectByUrl(url).subscribe(
      result => {
        this.vehicles.push(result);
      },
      error => {
          console.log(error);
      }
    );
  }

  getStarships(url:string) {
    this._appService.findObjectByUrl(url).subscribe(
      result => {
        this.starships.push(result);
      },
      error => {
          console.log(error);
      }
    );
  }
}