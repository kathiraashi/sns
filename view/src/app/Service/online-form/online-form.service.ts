
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = 'http://localhost:3000/API/Form_Submit/';

@Injectable()
export class OnlineFormService {

    constructor( private http: Http) {  }

    private handleError (error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }

    public Online_Form_Submit(data: any): Observable<any[]>  {
        return this.http .post(API_URL + 'Online_Form_Submit', data)
        .map(response => { const datas = response.json(); return datas; }) .catch(this.handleError);
    }


}
