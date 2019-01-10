import {  Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import * as CryptoJS from 'crypto-js';
import { HomeService } from './../Service/home/home.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.css']
})
export class VacanciesComponent implements OnInit {

   Institution_Id: any;
   _Data: any;
   _Vacancies: any[] = [];


  constructor( private router: Router,
               private Active_route: ActivatedRoute,
               private Home_Service: HomeService
               ) {
                  this.Active_route.params.subscribe(res => {
                     this.Institution_Id = res.Institution_Id;
                     const Data = {Institution_Id : this.Institution_Id };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Home_Service.Institution_View({'Info': Info}).subscribe( response => {
                        if (response['Status'] ) {
                           const CryptoBytes  = CryptoJS.AES.decrypt(response['Response'], 'SecretKeyOut@123');
                           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                           this._Data = DecryptedData;
                        }
                     });
                     this.Home_Service.VacanciesConfig_List({'Info': Info}).subscribe( response => {
                        if (response['Status'] ) {
                           const CryptoBytes  = CryptoJS.AES.decrypt(response['Response'], 'SecretKeyOut@123');
                           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                           this._Vacancies = DecryptedData.map( (obj, _index) => {
                              if (_index === 0) {
                                 obj['Expand'] = true;
                              } else {
                                 obj['Expand'] = false;
                              }
                              return obj;
                           });
                           console.log(this._Vacancies);
                        }
                     });
                  });
               }

  ngOnInit() {
  }

}




import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'innerHtml'
})
export class InnerHtmlPipe implements PipeTransform {

   constructor(private _sanitizer: DomSanitizer) {}

   transform(html: string): SafeHtml {
      return this._sanitizer.bypassSecurityTrustHtml(html);
   }

}

