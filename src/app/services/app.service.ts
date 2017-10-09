import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { HttpModule } from '@angular/http';
import { HttpErrorResponse } from "@angular/common/http";
import {Observable} from 'rxjs/Rx';
import {Headers} from '@angular/http';
@Injectable()
export class MyService {
  constructor (
    private http: Http
  ) {}

  getData(){
    return this.http.get('http://handmadetoys.in/api/article')
    .map((res:Response) => res.json());
  }
  getShopData(){
    return this.http.get('http://handmadetoys.in/api/shop')
    .map((res:Response) => res.json());
  }
  newsLetter(email){    
    var output: JSON;
    var obj :any  = {"email": email};
    output        = <JSON>obj;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers.append('Access-Control-Allow-Origin', '*');
    //headers.append('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
    
    return this.http.post('http://handmadetoys.in/api/newsletter', output,{ headers: headers })
    .map((res:Response) => res.json());
  }

}