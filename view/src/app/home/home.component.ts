import { Component, OnInit } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { HomeService } from './../Service/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   _List: any[] = [];
  constructor(private Service: HomeService) {
      const Data = {'User_Id' : '1234567890987654321' };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.Institution_SimpleList({'Info': Info}).subscribe( response => {
         if (response['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(response['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            console.log(DecryptedData);
         }
      });
   }


  ngOnInit() {
  }

}
