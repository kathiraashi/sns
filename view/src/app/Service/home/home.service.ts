import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = 'http://139.59.59.41:5000/API/Settings/Institution/';

@Injectable()
export class HomeService {

   constructor( private http: Http) {  }

   private handleError (error: Response | any) {
       console.error('ApiService::handleError', error);
       return Observable.throw(error);
   }

   public Institution_SimpleList(data: any): Observable<any[]>  {
       return this.http.post(API_URL + 'Institution_SimpleList', data)
       .map(response => { const ReturnResponse = response.json(); return ReturnResponse; }) .catch(this.handleError);
   }
   public Institution_View(data: any): Observable<any[]>  {
      return this.http.post(API_URL + 'Institution_View', data)
      .map(response => { const ReturnResponse = response.json(); return ReturnResponse; }) .catch(this.handleError);
  }

}
