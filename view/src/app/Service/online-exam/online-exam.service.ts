
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = 'http://localhost:5000/API/';


@Injectable()
export class OnlineExamService {

   constructor( private http: Http) {  }

   private handleError (error: Response | any) {
       console.error('ApiService::handleError', error);
       return Observable.throw(error);
   }

   public Online_Exam(data: any): Observable<any[]>  {
       return this.http .post(API_URL + 'Candidate/Online_Exam', data)
       .map(response => { const ReturnResponse = response.json(); return ReturnResponse; }) .catch(this.handleError);
   }

   public Online_Exam_Qus_Submit(data: any): Observable<any[]>  {
      return this.http .post(API_URL + 'Candidate/Online_Exam_Qus_Submit', data)
      .map(response => { const ReturnResponse = response.json(); return ReturnResponse; }) .catch(this.handleError);
   }

   public Online_Exam_Qus_Later(data: any): Observable<any[]>  {
      return this.http .post(API_URL + 'Candidate/Online_Exam_Qus_Later', data)
      .map(response => { const ReturnResponse = response.json(); return ReturnResponse; }) .catch(this.handleError);
   }


   public Online_Exam_Submit(data: any): Observable<any[]>  {
      return this.http .post(API_URL + 'Candidate/Online_Exam_Submit', data)
      .map(response => { const ReturnResponse = response.json(); return ReturnResponse; }) .catch(this.handleError);
   }

   public Exam_Details(data: any): Observable<any[]>  {
      return this.http .post(API_URL + 'Settings/ExamDetails/ExamDetails_List', data)
      .map(response => { const ReturnResponse = response.json(); return ReturnResponse; }) .catch(this.handleError);
   }


}
