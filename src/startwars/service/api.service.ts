import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const URL = 'https://swapi.co/api/';

@Injectable()
export class ApiService {
  
  constructor(private http: HttpClient) { }

  getById(url){
    return this.http.get(url)
  }

  getPeople(name) {
    return this.http.get(`${URL}people/?search=${name}`)
  }

  getByPage(page){
    return this.http.get(`${URL}people/?page=${page}`)
  }

  async getWorld(url) {
    try {
      const response: any = this.http.get(url)
      return response.name;
    } catch(error) {
      console.error(error)
    }
  }

}
