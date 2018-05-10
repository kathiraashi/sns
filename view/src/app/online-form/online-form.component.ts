import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { OnlineFormService } from './../Service/online-form/online-form.service';

@Component({
  selector: 'app-online-form',
  templateUrl: './online-form.component.html',
  styleUrls: ['./online-form.component.css']
})
export class OnlineFormComponent implements OnInit {

  bsConfig: Partial<BsDatepickerConfig>;

  isLinear = false;
  FormGroup: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  SubmitFormGroup: FormGroup;

  gender: String = 'Male';
  mar_status: String = 'Single';
  Experience_status: String = 'Fresher';

  selectedCity;

  PgCourses = [
    {name: 'M.E'},
    {name: 'M.Tech'},
    {name: 'MBA'},
    {name: 'M.Sc / MCA'}
  ];

  UgCourses = [
    {name: 'B.E'},
    {name: 'B.Tech'},
    {name: 'B.B.A'},
    {name: 'B.Sc / BCA'}
  ];

  Phd = [
    {name: 'Thesis Submitted'},
    {name: 'Completed'}
  ];

  Experience_Type = [
    {name: 'Teaching'},
    {name: 'Admin'}
  ];

  Attended_As = [
    {name: 'Student'},
    {name: 'Faculty'}
  ];

  ShowKidsInfo: Boolean = false;
  kids_List;

  constructor(private _formBuilder: FormBuilder,
              public snackBar: MatSnackBar,
              private router: Router,
              private Service: OnlineFormService) {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-red' });
   }

  ngOnInit() {

    this.FormGroup = this._formBuilder.group({
      Post_Applied: new FormControl(''),
      Department: new FormControl(''),
      Preferred_Subject_1: new FormControl(''),
      Preferred_Subject_2: new FormControl(''),
      Preferred_Subject_3: new FormControl(''),
      Preferred_Lab_1: new FormControl(''),
      Preferred_Lab_2: new FormControl(''),
    });


    this.firstFormGroup = this._formBuilder.group({
      Name: new FormControl(''),
      DOB: new FormControl(''),
      Age: new FormControl(''),
      Gender: new FormControl(''),
      Blace_of_Birth: new FormControl(''),
      Nationality: new FormControl(''),
      Religion: new FormControl(''),
      Community: new FormControl(''),
      Caste: new FormControl(''),
      Aadhar_No: new FormControl(''),
      PAN_No: new FormControl(''),
      Contact_No: new FormControl(''),
      Email: new FormControl(''),
      Permanent_Door_No: new FormControl(''),
      Permanent_Street: new FormControl(''),
      Permanent_City: new FormControl(''),
      Permanent_Pin_Code: new FormControl(''),
      Address_Same: new FormControl(''),
      Present_Door_No: new FormControl(''),
      Present_Street: new FormControl(''),
      Present_City: new FormControl(''),
      Present_Pin_Code: new FormControl(''),
      Marital_Status: new FormControl(''),
      Father_Name: new FormControl(''),
      Father_Designation: new FormControl(''),
      Father_Organization: new FormControl(''),
      Father_Locality: new FormControl(''),
      Father_Contact_Number: new FormControl(''),
      Mother_Name: new FormControl(''),
      Mother_Designation: new FormControl(''),
      Mother_Organization: new FormControl(''),
      Mother_Locality: new FormControl(''),
      Mother_Contact_Number: new FormControl(''),
      Spouse_Name: new FormControl(''),
      Spouse_Designation: new FormControl(''),
      Spouse_Organization: new FormControl(''),
      Spouse_Locality: new FormControl(''),
      Spouse_Contact_Number: new FormControl(''),
      No_Of_Siblings: new FormControl(''),
      No_Of_Kids: new FormControl(''),
      kids_List: this._formBuilder.array([ ])
    });

    this.secondFormGroup = this._formBuilder.group({
      PG_Course: new FormControl(''),
      PG_Year_Of_Passing: new FormControl(''),
      PG_College_Name: new FormControl(''),
      PG_Percentage: new FormControl(''),
      PG_History_of_arrears: new FormControl(''),
      UG_Course: new FormControl(''),
      UG_Year_Of_Passing: new FormControl(''),
      UG_College_Name: new FormControl(''),
      UG_Percentage: new FormControl(''),
      UG_History_of_arrears: new FormControl(''),
      PHD_Course: new FormControl(''),
      PHD_Year_Of_completion: new FormControl(''),
      PHD_University_Name: new FormControl(''),
      Hsl_School: new FormControl(''),
      Hsl_Mediam: new FormControl(''),
      Hsl_Year_Of_Passing: new FormControl(''),
      Hsl_Percentage: new FormControl(''),
      Sslc_School: new FormControl(''),
      Sslc_Mediam: new FormControl(''),
      Sslc_Year_Of_Passing: new FormControl(''),
      Sslc_Percentage: new FormControl(''),
    });

    this.thirdFormGroup = this._formBuilder.group({
      Experience: new FormControl(''),
      Number_Of_Years: new FormControl(''),
      Field_of_Experience: new FormControl(''),
      Institute: new FormControl(''),
      Works_Handled: new FormControl(''),
      Subjects_Handled: new FormControl(''),
      Working_Duration: new FormControl(''),
      Workshop_Attended_As: new FormControl(''),
      Workshop_Institute: new FormControl(''),
      Workshop_Domain: new FormControl(''),
      Paper_Presentation_Attended_As: new FormControl(''),
      Paper_Presentation_Institute: new FormControl(''),
      Paper_Presentation_Domain: new FormControl(''),
      Paper_Presentation_Title: new FormControl(''),
      Project_Presentation_Attended_As: new FormControl(''),
      Project_Presentation_Institute: new FormControl(''),
      Project_Presentation_Domain: new FormControl(''),
      Project_Presentation_Title: new FormControl(''),
      UG_Project_Domain: new FormControl(''),
      UG_Project_Title: new FormControl(''),
      PG_Project_Domain: new FormControl(''),
      PG_Project_Title: new FormControl(''),
      Pattron_Domain: new FormControl(''),
      Pattron_Title: new FormControl(''),
      Intrested_Game: new FormControl(''),
      Achievements: new FormControl(''),
      Activities: new FormControl(''),
      Special_Achievements: new FormControl(''),
      Joining_Time: new FormControl(''),
      Expected_Salary: new FormControl(''),

    });

    this.fourthFormGroup = this._formBuilder.group({
      Reference1_Name: new FormControl(''),
      Reference2_Name: new FormControl(''),
      Reference1_Designation: new FormControl(''),
      Reference2_Designation: new FormControl(''),
      Reference1_Organization: new FormControl(''),
      Reference2_Organization: new FormControl(''),
      Reference1_Contact_Number: new FormControl(''),
      Reference2_Contact_Number: new FormControl(''),
      Reference1_Email_Id: new FormControl(''),
      Reference2_Email_Id: new FormControl(''),
      Place: new FormControl(''),
      Date: new FormControl(''),
    });

  }

  Marital_Status_Change() {
    this.firstFormGroup.controls['Spouse_Name'].setValue('');
    this.firstFormGroup.controls['Spouse_Designation'].setValue('');
    this.firstFormGroup.controls['Spouse_Organization'].setValue('');
    this.firstFormGroup.controls['Spouse_Locality'].setValue('');
    this.firstFormGroup.controls['Spouse_Contact_Number'].setValue('');
    this.firstFormGroup.controls['No_Of_Siblings'].setValue('');
    this.firstFormGroup.controls['No_Of_Kids'].setValue('');
    this.firstFormGroup.controls['No_Of_Kids'].setValue('');
    const arr = <FormArray>this.firstFormGroup.controls['kids_List'];
    arr.controls = [];
    this.firstFormGroup.value.kids_List = [];
  }

  Kits_FormArray(): FormGroup {
    return this._formBuilder.group({
      Kids_Name: new FormControl(''),
      Kids_Age: new FormControl(''),
      Kids_Gender: new FormControl(''),
      Kids_Class_Course: new FormControl(''),
      Kids_School_College: new FormControl('')
    });
  }

  kids_change(event) {
    const arr = <FormArray>this.firstFormGroup.controls['kids_List'];
    arr.controls = [];
    this.firstFormGroup.value.kids_List = [];
    if (event !== '' && event > 0) {
      this.ShowKidsInfo = true;
      let i = 0;
      while ( i++ < event) {
        const group = this.firstFormGroup.get('kids_List') as FormArray;
        group.push(this.Kits_FormArray());
      }
    } else {
      this.ShowKidsInfo = false;
    }
  }

  CalculateAge(event) {
      const timeDiff = Math.abs(Date.now() - event);
      const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      this.firstFormGroup.controls['Age'].setValue(age);
  }


  checkAddress(event) {
    if (event) {
      this.firstFormGroup.controls['Present_Door_No'].setValue( this.firstFormGroup.controls['Permanent_Door_No'].value);
      this.firstFormGroup.controls['Present_Street'].setValue( this.firstFormGroup.controls['Permanent_Street'].value);
      this.firstFormGroup.controls['Present_City'].setValue( this.firstFormGroup.controls['Permanent_City'].value);
      this.firstFormGroup.controls['Present_Pin_Code'].setValue( this.firstFormGroup.controls['Permanent_Pin_Code'].value);
    } else {
      this.firstFormGroup.controls['Present_Door_No'].setValue('');
      this.firstFormGroup.controls['Present_Street'].setValue('');
      this.firstFormGroup.controls['Present_City'].setValue('');
      this.firstFormGroup.controls['Present_Pin_Code'].setValue('');
    }
  }

  Experience_change(event) {
    const arr = <FormArray>this.firstFormGroup.controls.kids_List;
    arr.controls = [];
    if (event !== '' && event > 0) {
      this.ShowKidsInfo = true;
      let i = 0;
      while ( i++ < event) {
        const group = this.firstFormGroup.get('kids_List') as FormArray;
        group.push(this.Kits_FormArray());
      }
    } else {
      this.ShowKidsInfo = false;
    }
  }

  Submit_1() {
    console.log(this.FormGroup.value);
  }
  Submit_2() {
    console.log(this.firstFormGroup.value);
  }
  Submit_3() {
    console.log(this.secondFormGroup.value);
  }
  Submit_4() {
    console.log(this.thirdFormGroup.value);
  }
  Submit() {
    console.log(this.fourthFormGroup.value);
    const data = {
      Basic_Info : this.FormGroup.value,
      Personal_Info : this.firstFormGroup.value,
      Education_Info : this.secondFormGroup.value,
      Experience_Activity : this.thirdFormGroup.value,
      Reference_Declaration: this.fourthFormGroup.value,
    };
    this.Service.Online_Form_Submit(data).subscribe( datas => {
        if (datas['Status'] === 'True') {
          this.snackBar.open( 'You Application Successfully Submited', ' ', {
            horizontalPosition: 'center',
            duration: 3000,
            verticalPosition: 'top',
          });
          console.log(datas['Responce']);
          this.router.navigate(['/']);
        }
    });
  }





}
