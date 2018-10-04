
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = 'http://localhost:5000/API/Candidate/';

@Injectable()
export class OnlineFormService {

    constructor( private http: Http) {  }

    private handleError (error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }

    public Candidate_Submit(data: any): Observable<any[]>  {
        return this.http .post(API_URL + 'Candidate_Submit', data)
        .map(response => { const ReturnResponse = response.json(); return ReturnResponse; }) .catch(this.handleError);
    }

    public Pan_AsyncValidate(data: any): Observable<any[]>  {
        return this.http .post(API_URL + 'Pan_AsyncValidate', data)
        .map(response => { const ReturnResponse = response.json(); return ReturnResponse; }) .catch(this.handleError);
    }

    public Contact_AsyncValidate(data: any): Observable<any[]>  {
        return this.http .post(API_URL + 'Contact_AsyncValidate', data)
        .map(response => { const ReturnResponse = response.json(); return ReturnResponse; }) .catch(this.handleError);
    }

    public Email_AsyncValidate(data: any): Observable<any[]>  {
        return this.http .post(API_URL + 'Email_AsyncValidate', data)
        .map(response => { const ReturnResponse = response.json(); return ReturnResponse; }) .catch(this.handleError);
    }


}
