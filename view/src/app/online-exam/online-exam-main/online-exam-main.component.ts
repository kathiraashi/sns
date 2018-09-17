import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { OnlineExamService } from '../../Service/online-exam/online-exam.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-online-exam-main',
  templateUrl: './online-exam-main.component.html',
  styleUrls: ['./online-exam-main.component.css']
})
export class OnlineExamMainComponent implements OnInit {

   Min = 30;
   Sec = 0;

   _Data;
   _Questions: any[] = [];
   Exam_Id;
   FormGroup: FormGroup;

   LoggedIn: Boolean = false;
   LoggedInfo: Object = {};
   ValidationAlert: Boolean = false;
   AlertMessage;

   FinalQuestion: Boolean = false;

   constructor( private Service: OnlineExamService, private Active_route: ActivatedRoute) {
      this.Active_route.params.subscribe(res => {
         this.Exam_Id = res.Exam_Id;
       });
   }

   ngOnInit() {
      this.FormGroup = new FormGroup({
         Exam_Id: new FormControl(this.Exam_Id , Validators.required),
         Ref_Id: new FormControl('', Validators.required),
         OTP: new FormControl('', Validators.required)
      });
   }

   UserValidate() {
      if (this.FormGroup.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.FormGroup.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Online_Exam({Info: Info}).subscribe(response => {
            if (response['Status']) {
               const CryptoBytes  = CryptoJS.AES.decrypt(response['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Data = DecryptedData;
               this._Questions = this._Data['Questions'];
               this._Questions = this._Questions.map(obj => { obj.IfShow = false; obj.SetAns = ''; return obj; });
               this._Questions[0].IfShow = true;
               this.Min = this._Data['ExamDuration'];
               this.StartTimer();
               this.LoggedIn = true;
            } else {
               this.ValidationAlert = true;
               this.AlertMessage = response['Message'];
            }
         });
      }
   }

   StartTimer() {
      const Timer = setInterval(val => {
         this.Sec = this.Sec - 1;
         if (this.Sec < 0) {
            this.Min = this.Min - 1;
            this.Sec = 59;
         }
         if (this.Min < 0) {
            clearInterval(Timer);
            this.Min = 0;
            this.Sec = 0;
            const Data_One = { Exam_Id: this._Data['_id'], Candidate_Id: this._Data['Candidate']  };
            let Info_One = CryptoJS.AES.encrypt(JSON.stringify(Data_One), 'SecretKeyIn@123');
            Info_One = Info_One.toString();
            this.Service.Online_Exam_Submit({Info: Info_One}).subscribe(res => {
               if (!res['Status']) {
                  alert('Check Your Internet Connection!');
               } else {
                  this.LoggedIn = false;
                  this._Data['Questions'] = [];
                  this._Questions = [];
                  alert('Your Exam Successfully Completed and Updated! Expect the Result Soon!');
               }
            });
         }
      }, 1000);
   }

   Submit(_index) {
      this._Questions[_index].Status = 'Answered';
      this._Questions[_index].IfShow = false;
      let Status = 1;
      if (this._Questions[_index].SetAns === this._Questions[_index].Answer) { Status = 1; } else {  Status = 0; }
      const Data = { Exam_Id: this._Data['_id'],
                     Qus_Id: this._Questions[_index]._id,
                     Ans: this._Questions[_index].SetAns,
                     Status: Status
                  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.Online_Exam_Qus_Submit({Info: Info}).subscribe(res => {
         if (!res['Status']) {
            alert('Check Your Internet Connection!');
         }
      });
      const LatterQuestions = this._Questions.filter(obj => obj.Status === 'Latter');
      const UnTouchedQuestions = this._Questions.filter(obj => obj.Status === 'UnTouched');
      if (UnTouchedQuestions.length === 1 && LatterQuestions.length === 0) { this.FinalQuestion = true; }
      if (UnTouchedQuestions.length === 0 && LatterQuestions.length === 1) { this.FinalQuestion = true; }
      if (UnTouchedQuestions.length > 0) {
         const JumpIndex = this._Questions.findIndex(obj => obj._id === UnTouchedQuestions[0]._id);
         this._Questions[JumpIndex].IfShow = true;
      } else if (LatterQuestions.length > 0) {
         if (LatterQuestions.length > 1) {
            const CurrentSkipIndex = LatterQuestions.findIndex(obj => obj._id ===  this._Questions[_index]._id);
            if (LatterQuestions.length > CurrentSkipIndex + 1) {
               const JumpIndex = this._Questions.findIndex(obj => obj._id === LatterQuestions[CurrentSkipIndex + 1]._id);
               this._Questions[JumpIndex].IfShow = true;
            } else {
               const JumpIndex = this._Questions.findIndex(obj => obj._id === LatterQuestions[0]._id);
               this._Questions[JumpIndex].IfShow = true;
            }
         } else {
            const JumpIndex = this._Questions.findIndex(obj => obj._id === LatterQuestions[0]._id);
            this._Questions[JumpIndex].IfShow = true;
         }
      } else {
         const Data_One = { Exam_Id: this._Data['_id'], Candidate_Id: this._Data['Candidate'] };
         let Info_One = CryptoJS.AES.encrypt(JSON.stringify(Data_One), 'SecretKeyIn@123');
         Info_One = Info_One.toString();
         this.Service.Online_Exam_Submit({Info: Info_One}).subscribe(res => {
            if (!res['Status']) {
               alert('Check Your Internet Connection!');
            } else {
               this.LoggedIn = false;
               this._Data['Questions'] = [];
               this._Questions = [];
               alert('Your Exam Successfully Completed and Updated! Expect the Result Soon!');
            }
         });
      }
   }

   Later(_index) {
      this._Questions[_index].Status = 'Latter';
      this._Questions[_index].IfShow = false;

      const Data = { Exam_Id: this._Data['_id'], Qus_Id: this._Questions[_index]._id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.Online_Exam_Qus_Later({Info: Info}).subscribe(res => {
         if (!res['Status']) {
            alert('Check Your Internet Connection!');
         }
      });

      const UnTouchedQuestions = this._Questions.filter(obj => obj.Status === 'UnTouched');
      if (UnTouchedQuestions.length > 0) {
         const JumpIndex = this._Questions.findIndex(obj => obj._id === UnTouchedQuestions[0]._id);
         this._Questions[JumpIndex].IfShow = true;
      } else {
         const LatterQuestions = this._Questions.filter(obj => obj.Status === 'Latter');
         if (LatterQuestions.length > 1) {
            const CurrentSkipIndex = LatterQuestions.findIndex(obj => obj._id ===  this._Questions[_index]._id);
            if (LatterQuestions.length > CurrentSkipIndex + 1) {
               const JumpIndex = this._Questions.findIndex(obj => obj._id === LatterQuestions[CurrentSkipIndex + 1]._id);
               this._Questions[JumpIndex].IfShow = true;
            } else {
               const JumpIndex = this._Questions.findIndex(obj => obj._id === LatterQuestions[0]._id);
               this._Questions[JumpIndex].IfShow = true;
            }
         } else {
            const JumpIndex = this._Questions.findIndex(obj => obj._id === LatterQuestions[0]._id);
            this._Questions[JumpIndex].IfShow = true;
         }
      }
   }

   JumpToLater(_index) {
      const CurrentIndex = this._Questions.findIndex(obj => obj.IfShow === true);
      this._Questions[CurrentIndex].IfShow = false;
      this._Questions[_index].IfShow = true;
   }

}
