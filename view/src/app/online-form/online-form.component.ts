import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { OnlineFormService } from './../Service/online-form/online-form.service';
import { Dropdown } from 'primeng/primeng';

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

  FormGroup_Clicked: Boolean = false;
  firstFormGroup_Clicked: Boolean = false;
  secondFormGroup_Clicked: Boolean = false;
  thirdFormGroup_Valid: Boolean = false;
  fourthFormGroup_Valid: Boolean = false;

  gender: String = 'Male';
  mar_status: String = 'Single';
  Experience_status: String = 'Fresher';

  ChennaiGuideShip: String = 'No';

  selectedCity;

  PresentSate;

  States = [
    {'code': 'AN', 'name': 'Andaman and Nicobar Islands'},
    {'code': 'AP', 'name': 'Andhra Pradesh'},
    {'code': 'AR', 'name': 'Arunachal Pradesh'},
    {'code': 'AS', 'name': 'Assam'},
    {'code': 'BR', 'name': 'Bihar'},
    {'code': 'CG', 'name': 'Chandigarh'},
    {'code': 'CH', 'name': 'Chhattisgarh'},
    {'code': 'DH', 'name': 'Dadra and Nagar Haveli'},
    {'code': 'DD', 'name': 'Daman and Diu'},
    {'code': 'DL', 'name': 'Delhi'},
    {'code': 'GA', 'name': 'Goa'},
    {'code': 'GJ', 'name': 'Gujarat'},
    {'code': 'HR', 'name': 'Haryana'},
    {'code': 'HP', 'name': 'Himachal Pradesh'},
    {'code': 'JK', 'name': 'Jammu and Kashmir'},
    {'code': 'JH', 'name': 'Jharkhand'},
    {'code': 'KA', 'name': 'Karnataka'},
    {'code': 'KL', 'name': 'Kerala'},
    {'code': 'LD', 'name': 'Lakshadweep'},
    {'code': 'MP', 'name': 'Madhya Pradesh'},
    {'code': 'MH', 'name': 'Maharashtra'},
    {'code': 'MN', 'name': 'Manipur'},
    {'code': 'ML', 'name': 'Meghalaya'},
    {'code': 'MZ', 'name': 'Mizoram'},
    {'code': 'NL', 'name': 'Nagaland'},
    {'code': 'OR', 'name': 'Odisha'},
    {'code': 'PY', 'name': 'Puducherry'},
    {'code': 'PB', 'name': 'Punjab'},
    {'code': 'RJ', 'name': 'Rajasthan'},
    {'code': 'SK', 'name': 'Sikkim'},
    {'code': 'TN', 'name': 'Tamil Nadu'},
    {'code': 'TS', 'name': 'Telangana'},
    {'code': 'TR', 'name': 'Tripura'},
    {'code': 'UK', 'name': 'Uttarakhand'},
    {'code': 'UP', 'name': 'Uttar Pradesh'},
    {'code': 'WB', 'name': 'West Bengal'}
  ];

  Medium = [
    {name: 'English'},
    {name: 'Tamil'},
    {name: 'Other'}
  ];

  Departments = [
    { name: 'Physics'},
    { name: 'Mathematics'},
    { name: 'English'},
    { name: 'Tamil'},
    { name: 'E-commerce'},
    { name: 'CA'},
    { name: 'Computer Science'},
    { name: 'Aeronautical Engineering'},
    { name: 'Automobile Engineering'},
    { name: 'Bio-Technology'},
    { name: 'Computer Science and Engineering'},
    { name: 'Civil Engineering'},
    { name: 'Electronics and Communication Engineering'},
    { name: 'Electronics and Instrumentation Engineering'},
    { name: 'Electrical and Electronics Engineering'},
    { name: 'Fashion Technology'},
    { name: 'Information Technology'},
    { name: 'Textile Technology'},
    { name: 'Master of  Computer Applications'},
    { name: 'Mechanical Engineering'},
    { name: 'Mechatronics Engineering'},
    { name: 'Science and Humanities'},
    { name: 'Science and Humanities-Physics'},
    { name: 'Science and Humanities-Chemistry'},
    { name: 'Science and Humanities-English'},
    { name: 'Science and Humanities-Mathematics'},
    { name: 'HR'},
    { name: 'Systems'},
    { name: 'Marketing'},
    { name: 'Others'},
  ];

  Grade_Class = [
    {name: 'Fwd*'},
    {name: 'I Class'},
    {name: 'II Class'}
  ];

  PgCourses = [
    {name: 'MA'},
    {name: 'MSC'},
    {name: 'MBA'},
    {name: 'MCA'},
    {name: 'ME/M.Tech'},
  ];

  UgCourses = [
    {name: 'BA'},
    {name: 'BSc'},
    {name: 'BBA'},
    {name: 'BE/B.Tech'},
  ];

  MphilCourses = [
    {name: 'Mphil'}
  ];

  PhdCourses = [
    {name: 'Phd'}
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
      Post_Applied: new FormControl('', Validators.required),
      Department: new FormControl('', Validators.required),
      Preferred_Subject_1: new FormControl('', Validators.required),
      Preferred_Subject_2: new FormControl(''),
      Preferred_Subject_3: new FormControl(''),
      Preferred_Lab_1: new FormControl('', Validators.required),
      Preferred_Lab_2: new FormControl(''),
    });

    this.firstFormGroup = this._formBuilder.group({
      Name: new FormControl('', Validators.required),
      DOB: new FormControl('', Validators.required),
      Age: new FormControl('', Validators.required),
      Gender: new FormControl('', Validators.required),
      Blace_of_Birth: new FormControl('', Validators.required),
      Nationality: new FormControl('', Validators.required),
      Religion: new FormControl('', Validators.required),
      Community: new FormControl('', Validators.required),
      Caste: new FormControl('', Validators.required),
      Aadhar_No: new FormControl('', Validators.required),
      PAN_No: new FormControl(''),
      Contact_No: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
      Permanent_Door_No: new FormControl('', Validators.required),
      Permanent_Street: new FormControl('', Validators.required),
      Permanent_City: new FormControl('', Validators.required),
      Permanent_Sate: new FormControl('', Validators.required),
      Permanent_Pin_Code: new FormControl('', Validators.required),
      Address_Same: new FormControl(''),
      Present_Door_No: new FormControl('', Validators.required),
      Present_Street: new FormControl('', Validators.required),
      Present_City: new FormControl('', Validators.required),
      Present_Sate: new FormControl('', Validators.required),
      Present_Pin_Code: new FormControl('', Validators.required),
      Marital_Status: new FormControl('', Validators.required),
      Father_Name: new FormControl('', Validators.required),
      Father_Designation: new FormControl(''),
      Father_Organization: new FormControl(''),
      Father_Locality: new FormControl(''),
      Mother_Name: new FormControl('', Validators.required),
      Mother_Designation: new FormControl(''),
      Mother_Organization: new FormControl(''),
      Mother_Locality: new FormControl(''),
      Spouse_Name: new FormControl(''),
      Spouse_Designation: new FormControl(''),
      Spouse_Organization: new FormControl(''),
      Spouse_Locality: new FormControl(''),
      No_Of_Siblings: new FormControl(''),
      No_Of_Kids: new FormControl(''),
      kids_List: this._formBuilder.array([ ])
    });

    this.secondFormGroup = this._formBuilder.group({

      UG_Course: new FormControl(''),
      UG_Department: new FormControl(''),
      UG_Class: new FormControl(''),
      UG_Year_Of_Passing: new FormControl(''),
      UG_College_Name: new FormControl(''),
      UG_Percentage: new FormControl(''),
      UG_Medium: new FormControl(''),

      PG_Course: new FormControl(''),
      PG_Department: new FormControl(''),
      PG_Class: new FormControl(''),
      PG_Year_Of_Passing: new FormControl(''),
      PG_College_Name: new FormControl(''),
      PG_Percentage: new FormControl(''),
      PG_Medium: new FormControl(''),

      Mphil_Course: new FormControl(''),
      Mphil_Department: new FormControl(''),
      Mphil_Class: new FormControl(''),
      Mphil_Year_Of_Passing: new FormControl(''),
      Mphil_College_Name: new FormControl(''),
      Mphil_Percentage: new FormControl(''),
      Mphil_Medium: new FormControl(''),

      PHD_Course: new FormControl(''),
      PHD_Department: new FormControl(''),
      PHD_Class: new FormControl(''),
      PHD_Year_Of_Passing: new FormControl(''),
      PHD_College_Name: new FormControl(''),
      PHD_Percentage: new FormControl(''),
      PHD_Medium: new FormControl(''),

      Hsl_School: new FormControl(''),
      Hsl_Medium: new FormControl(''),
      Hsl_Year_Of_Passing: new FormControl(''),
      Hsl_Percentage: new FormControl(''),

      Sslc_School: new FormControl(''),
      Sslc_Medium: new FormControl(''),
      Sslc_Year_Of_Passing: new FormControl(''),
      Sslc_Percentage: new FormControl(''),

      Chennai_Guide_ship: new FormControl(''),
      Chennai_Guide_ship_No: new FormControl(''),
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
    this.firstFormGroup.controls['No_Of_Siblings'].setValue('');
    this.firstFormGroup.controls['No_Of_Kids'].setValue('');
    this.firstFormGroup.controls['No_Of_Kids'].setValue('');
    const arr = <FormArray>this.firstFormGroup.controls['kids_List'];
    arr.controls = [];
     const group = this.firstFormGroup.get('kids_List') as FormArray;
    this.firstFormGroup.value.kids_List = [];
    if (this.firstFormGroup.controls['Marital_Status'].value === 'Married') {
      this.firstFormGroup.controls['Spouse_Name'].setValidators(Validators.required);
    } else  {
      this.firstFormGroup.controls['Spouse_Name'].setValidators(null);
    }
    this.firstFormGroup.controls['Spouse_Name'].updateValueAndValidity();
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
      this.firstFormGroup.controls['Present_Sate'].setValue( this.firstFormGroup.controls['Permanent_Sate'].value);
      this.firstFormGroup.controls['Present_Pin_Code'].setValue( this.firstFormGroup.controls['Permanent_Pin_Code'].value);
    } else {
      this.firstFormGroup.controls['Present_Door_No'].setValue('');
      this.firstFormGroup.controls['Present_Street'].setValue('');
      this.firstFormGroup.controls['Present_City'].setValue('');
      this.firstFormGroup.controls['Present_Pin_Code'].setValue('');
      this.PresentSate = '';
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

  _keyPress(event: any) {
    const pattern = /[0-9\.\-\+\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  Submit_1() {
    this.FormGroup_Clicked = true;
    console.log(this.FormGroup);
  }
  Submit_2() {
    this.firstFormGroup_Clicked = true;
    console.log(this.firstFormGroup);
  }
  Submit_3() {
    console.log(this.secondFormGroup);
  }
  Submit_4() {
    console.log(this.thirdFormGroup.value);
  }
  Submit() {
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
