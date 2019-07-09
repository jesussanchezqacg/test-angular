import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs-compat/operator/map';

@Injectable()
export class AppService {
    
    private url:string;
    private urlProxy:string;

    constructor(private _http:Http) {
        this.url = "https://swapi.co/api/";
        this.urlProxy = "http://localhost:4200/api/";
    }

    findPeopleByName(name:string) {
        return this._http.get(this.url.concat("people/?search="+name)).map(data => data.json());
    }

    findObjectByUrl(url:string) {
        return this._http.get(url).map(data => data.json());
    }

    callProxy() {
        const headers = new Headers();
        headers.set('Access-Control-Allow-Origin', '*');
        headers.set('Access-Control-Allow-Credentials', 'true');
        headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        headers.set('Access-Control-Allow-Headers', 'X-Custom-Header');
        return this._http.get(this.urlProxy.concat("people"), {headers}).map(data => data.json());
    }

    findAllPeople() {
        this.callProxy();
        return this._http.get(this.url.concat("people")).map(data => data.json());
    }
}