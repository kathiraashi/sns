var CandidateModel = require('../models/Candidate.model.js');
var ErrorManagement = require('./../../app/config/ErrorHandling.js');
var parser = require('ua-parser-js');
var get_ip = require('ipware')().get_ip;
var multer = require('multer');


// file Upload Disk Storage and Validate Functions ----------------------------------------------------------------------------------------
var User_Image_Storage = multer.diskStorage({
   destination: (req, file, cb) => {
      if ( file.fieldname === 'Cover_Later'){
         cb(null, './Uploads/CandidateCoverLater'); 
      } if (file.fieldname === 'Photo' ) {
         cb(null, './Uploads/CandidatePhotos'); 
      } if (file.fieldname === 'Sign' ) {
         cb(null, './Uploads/CandidateSignatures'); 
      }
   },
   filename: (req, file, cb) => {
      if (file.fieldname === 'Cover_Later'){
         cb(null, 'CoverLater_' + Date.now() + '.pdf'); 
      } if (file.fieldname === 'Photo'){
         cb(null, 'CandidatePhoto_' + Date.now() + '.png'); 
      } if (file.fieldname === 'Sign') {
         cb(null, 'CandidateSignature_' + Date.now() + '.png'); 
      }
        
   }
});

var User_Image_Upload = multer({
   storage: User_Image_Storage,
   fileFilter: function (req, file, callback) {
      let extArray = file.originalname.split(".");
      let extension = (extArray[extArray.length - 1]).toLowerCase();
      if(extension !== 'png' && extension !== 'jpg' && extension !== 'jpeg' && extension !== 'pdf') {
         return callback("Only 'png, jpeg, jpg and pdf' files are allowed");
      }
      callback(null, true);
   }
}).fields([{name: 'Cover_Later', maxCount: 1 },{name: 'Photo', maxCount: 1 }, {name: 'Sign', maxCount: 1 }]);





exports.Aadhar_AsyncValidate = function(req, res) {
   if(!req.body.Aadhar || req.body.Aadhar === '' ) {
      res.status(400).send({Status: false, Message: "Aadhar Details can not be empty" });
   }else {
      CandidateModel.CandidatesSchema.findOne({'Personal_Info.Aadhar_No': { $regex : new RegExp("^" + req.body.Aadhar + "$", "i") }}, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Aadhar Async Validate Find Query Error', 'CRM_Settings.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Validate Aadhar Number Validate!."});
         } else {
            if ( result !== null) {
               res.status(200).send({Status: true, Available: false });
            } else {
               res.status(200).send({Status: true, Available: true });
            }
         }
      });
   }
};   

exports.Contact_AsyncValidate = function(req, res) {
   if(!req.body.Contact || req.body.Contact === '' ) {
      res.status(400).send({Status: false, Message: "Contact Details can not be empty" });
   }else {
      CandidateModel.CandidatesSchema.findOne({'Personal_Info.Contact_No': { $regex : new RegExp("^" + req.body.Contact + "$", "i") }}, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Contact Async Validate Find Query Error', 'CRM_Settings.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Validate Contact Number Validate!."});
         } else {
            if ( result !== null) {
               res.status(200).send({Status: true, Available: false });
            } else {
               res.status(200).send({Status: true, Available: true });
            }
         }
      });
   }
};   


exports.Email_AsyncValidate = function(req, res) {
   if(!req.body.Email || req.body.Email === '' ) {
      res.status(400).send({Status: false, Message: "Email Details can not be empty" });
   }else {
      CandidateModel.CandidatesSchema.findOne({'Personal_Info.Email': { $regex : new RegExp("^" + req.body.Email + "$", "i") }}, {}, {}, function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Email Async Validate Find Query Error', 'CRM_Settings.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Validate Email Validate!."});
         } else {
            if ( result !== null) {
               res.status(200).send({Status: true, Available: false });
            } else {
               res.status(200).send({Status: true, Available: true });
            }
         }
      });
   }
};   


// ---------------------------------------------------------------------- Candidate Online Form Submit ---------------------------------------------------------------
exports.Candidate_Submit = function(req, res) {
   User_Image_Upload(req, res, function(upload_err) {

      if(!req.body.Basic_Info || req.body.Basic_Info === '') {
         res.status(400).send({Status: true, Message: "Basic Details can not be empty" });
      }else if(!req.body.Personal_Info || req.body.Personal_Info === '') {
         res.status(400).send({Status: true, Message: "Personal Details can not be empty" });
      }else if(!req.body.Education_Info || req.body.Education_Info === '') {
         res.status(400).send({Status: true, Message: "Education Details can not be empty" });
      }else if(!req.body.Activity_Info || req.body.Activity_Info === '') {
         res.status(400).send({Status: true, Message: "Activity Details can not be empty" });
      }else if(!req.body.Reference_Info || req.body.Reference_Info === '') {
         res.status(400).send({Status: true, Message: "Reference Details can not be empty" });
      }else if(upload_err !== undefined){
         res.status(400).send({Status: true, Message: "Files Handling Error Please Try Again" });
      }else if(!req.files || typeof req.files !== 'object' || Object.keys(req.files).length !== 3) {
         res.status(400).send({Status: true, Message: "Some Uploaded File is Not Valid" });
      }else{

         var Basic_Info = JSON.parse(req.body.Basic_Info);
         var Personal_Info = JSON.parse(req.body.Personal_Info);
         var Education_Info = JSON.parse(req.body.Education_Info);
         var Activity_Info = JSON.parse(req.body.Activity_Info);
         var Reference_Info = JSON.parse(req.body.Reference_Info);


         var Cover_Later = req.files.Cover_Later.map(Obj => { delete Obj.encoding; delete Obj.destination; delete Obj.path; delete Obj.originalname; delete Obj.fieldname; return Obj; });
         var Photo = req.files.Photo.map(Obj => { delete Obj.encoding; delete Obj.destination; delete Obj.path; delete Obj.originalname; delete Obj.fieldname; return Obj; });
         var Sign = req.files.Sign.map(Obj => { delete Obj.encoding; delete Obj.destination; delete Obj.path; delete Obj.originalname; delete Obj.fieldname; return Obj; });

         if (typeof Education_Info.UG_Course === 'object' && Object.keys(Education_Info.UG_Course).length > 0) { Education_Info.UG_Course = Education_Info.UG_Course.name;}
         if (typeof Education_Info.UG_Class === 'object' && Object.keys(Education_Info.UG_Class).length > 0) { Education_Info.UG_Class = Education_Info.UG_Class.name;}
         if (typeof Education_Info.UG_Medium === 'object' && Object.keys(Education_Info.UG_Medium).length > 0) { Education_Info.UG_Medium = Education_Info.UG_Medium.name;}

         if (typeof Education_Info.PG_Course === 'object' && Object.keys(Education_Info.PG_Course).length > 0) { Education_Info.PG_Course = Education_Info.PG_Course.name;}
         if (typeof Education_Info.PG_Class === 'object' && Object.keys(Education_Info.PG_Class).length > 0) { Education_Info.PG_Class = Education_Info.PG_Class.name;}
         if (typeof Education_Info.PG_Medium === 'object' && Object.keys(Education_Info.PG_Medium).length > 0) { Education_Info.PG_Medium = Education_Info.PG_Medium.name;}

         if (typeof Education_Info.Mphil_Course === 'object' && Object.keys(Education_Info.Mphil_Course).length > 0) { Education_Info.Mphil_Course = Education_Info.Mphil_Course.name;}
         if (typeof Education_Info.Mphil_Class === 'object' && Object.keys(Education_Info.Mphil_Class).length > 0) { Education_Info.Mphil_Class = Education_Info.Mphil_Class.name;}
         if (typeof Education_Info.Mphil_Medium === 'object' && Object.keys(Education_Info.Mphil_Medium).length > 0) { Education_Info.Mphil_Medium = Education_Info.Mphil_Medium.name;}

         if (typeof Education_Info.PHD_Course === 'object' && Object.keys(Education_Info.PHD_Course).length > 0) { Education_Info.PHD_Course = Education_Info.PHD_Course.name;}
         if (typeof Education_Info.PHD_Medium === 'object' && Object.keys(Education_Info.PHD_Medium).length > 0) { Education_Info.PHD_Medium = Education_Info.PHD_Medium.name;}

         if (typeof Education_Info.Bed_Class === 'object' && Object.keys(Education_Info.Bed_Class).length > 0) { Education_Info.Bed_Class = Education_Info.Bed_Class.name;}
         if (typeof Education_Info.Bed_Medium === 'object' && Object.keys(Education_Info.Bed_Medium).length > 0) { Education_Info.Bed_Medium = Education_Info.Bed_Medium.name;}

         if (typeof Education_Info.Med_Class === 'object' && Object.keys(Education_Info.Med_Class).length > 0) { Education_Info.Med_Class = Education_Info.Med_Class.name;}
         if (typeof Education_Info.Med_Medium === 'object' && Object.keys(Education_Info.Med_Medium).length > 0) { Education_Info.Med_Medium = Education_Info.Med_Medium.name;}
         
         if (typeof Education_Info.Other1_Class === 'object' && Object.keys(Education_Info.Other1_Class).length > 0) { Education_Info.Other1_Class = Education_Info.Other1_Class.name;}
         if (typeof Education_Info.Other1_Medium === 'object' && Object.keys(Education_Info.Other1_Medium).length > 0) { Education_Info.Other1_Medium = Education_Info.Other1_Medium.name;}

         if (typeof Education_Info.Other2_Class === 'object' && Object.keys(Education_Info.Other2_Class).length > 0) { Education_Info.Other2_Class = Education_Info.Other2_Class.name;}
         if (typeof Education_Info.Other2_Medium === 'object' && Object.keys(Education_Info.Other2_Medium).length > 0) { Education_Info.Other2_Medium = Education_Info.Other2_Medium.name;}
         
         if (typeof Education_Info.Hsc_Medium === 'object' && Object.keys(Education_Info.Hsc_Medium).length > 0) { Education_Info.Hsc_Medium = Education_Info.Hsc_Medium.name;}
         if (typeof Education_Info.Sslc_Medium === 'object' && Object.keys(Education_Info.Sslc_Medium).length > 0) { Education_Info.Sslc_Medium = Education_Info.Sslc_Medium.name;}
         
         var VarCandidatesSchema = new CandidateModel.CandidatesSchema({

            'Basic_Info.Post_Applied': Basic_Info.Post_Applied.name,
            'Basic_Info.Department': Basic_Info.Department.name,
            'Basic_Info.Preferred_Subject_1': Basic_Info.Preferred_Subject_1,
            'Basic_Info.Preferred_Subject_2': Basic_Info.Preferred_Subject_2,
            'Basic_Info.Preferred_Subject_3': Basic_Info.Preferred_Subject_3,

            'Personal_Info.Name' :  Personal_Info.Name,
            'Personal_Info.DOB' : Personal_Info.DOB,
            'Personal_Info.Age' : Personal_Info.Age,
            'Personal_Info.Gender' : Personal_Info.Gender,
            'Personal_Info.Place_of_Birth' : Personal_Info.Place_of_Birth,
            'Personal_Info.Nationality' : Personal_Info.Nationality.name,
            'Personal_Info.Religion' :  Personal_Info.Religion.name,
            'Personal_Info.Community' : Personal_Info.Community.name,
            'Personal_Info.Caste' : Personal_Info.Caste,
            'Personal_Info.Aadhar_No' : Personal_Info.Aadhar_No,
            'Personal_Info.PAN_No' :  Personal_Info.PAN_No,
            'Personal_Info.Contact_No' : Personal_Info.Contact_No,
            'Personal_Info.Email' : Personal_Info.Email,
            'Personal_Info.Permanent_Door_No' : Personal_Info.Permanent_Door_No,
            'Personal_Info.Permanent_Street' : Personal_Info.Permanent_Street,
            'Personal_Info.Permanent_City' : Personal_Info.Permanent_City,
            'Personal_Info.Permanent_Sate' : Personal_Info.Permanent_Sate.name,
            'Personal_Info.Permanent_Pin_Code' : Personal_Info.Permanent_Pin_Code,
            'Personal_Info.Address_Same' : Personal_Info.Address_Same,
            'Personal_Info.Present_Door_No' : Personal_Info.Present_Door_No,
            'Personal_Info.Present_Street' : Personal_Info.Present_Street,
            'Personal_Info.Present_City' : Personal_Info.Present_City,
            'Personal_Info.Present_Sate' : Personal_Info.Present_Sate.name,
            'Personal_Info.Present_Pin_Code' : Personal_Info.Present_Pin_Code,
            'Personal_Info.Marital_Status' : Personal_Info.Marital_Status,
            'Personal_Info.Father_Name' : Personal_Info.Father_Name,
            'Personal_Info.Father_Designation' : Personal_Info.Father_Designation,
            'Personal_Info.Father_Organization' : Personal_Info.Father_Organization,
            'Personal_Info.Father_Locality' : Personal_Info.Father_Locality,
            'Personal_Info.Mother_Name' : Personal_Info.Mother_Name,
            'Personal_Info.Mother_Designation' : Personal_Info.Mother_Designation,
            'Personal_Info.Mother_Organization' : Personal_Info.Mother_Organization,
            'Personal_Info.Mother_Locality' : Personal_Info.Mother_Locality,
            'Personal_Info.Spouse_Name' : Personal_Info.Spouse_Name,
            'Personal_Info.Spouse_Designation' : Personal_Info.Spouse_Designation,
            'Personal_Info.Spouse_Organization' : Personal_Info.Spouse_Organization,
            'Personal_Info.Spouse_Locality' : Personal_Info.Spouse_Locality,
            'Personal_Info.No_Of_Siblings' : Personal_Info.No_Of_Siblings,
            'Personal_Info.No_Of_Kids' : Personal_Info.No_Of_Kids,
            'Personal_Info.kids_List' : Personal_Info.kids_List,


            'Education_Info.Sslc_School': Education_Info.Sslc_School,
            'Education_Info.Sslc_Medium': Education_Info.Sslc_Medium,
            'Education_Info.Sslc_Year_Of_Passing': Education_Info.Sslc_Year_Of_Passing,
            'Education_Info.Sslc_Percentage': Education_Info.Sslc_Percentage,
            'Education_Info.Hsc_School': Education_Info.Hsc_School,
            'Education_Info.Hsc_Medium': Education_Info.Hsc_Medium,
            'Education_Info.Hsc_Year_Of_Passing': Education_Info.Hsc_Year_Of_Passing,
            'Education_Info.Hsc_Percentage': Education_Info.Hsc_Percentage,
            'Education_Info.UG_Course': Education_Info.UG_Course,
            'Education_Info.UG_Department': Education_Info.UG_Department,
            'Education_Info.UG_Class': Education_Info.UG_Class,
            'Education_Info.UG_Year_Of_Passing': Education_Info.UG_Year_Of_Passing,
            'Education_Info.UG_College_Name': Education_Info.UG_College_Name,
            'Education_Info.UG_CGPA': Education_Info.UG_CGPA,
            'Education_Info.UG_Percentage': Education_Info.UG_Percentage,
            'Education_Info.UG_Medium': Education_Info.UG_Medium,
            'Education_Info.PG_Course': Education_Info.PG_Course,
            'Education_Info.PG_Department': Education_Info.PG_Department,
            'Education_Info.PG_Class': Education_Info.PG_Class,
            'Education_Info.PG_Year_Of_Passing': Education_Info.PG_Year_Of_Passing,
            'Education_Info.PG_College_Name': Education_Info.PG_College_Name,
            'Education_Info.PG_CGPA': Education_Info.PG_CGPA,
            'Education_Info.PG_Percentage': Education_Info.PG_Percentage,
            'Education_Info.PG_Medium': Education_Info.PG_Medium,
            'Education_Info.Mphil_Course': Education_Info.Mphil_Course,
            'Education_Info.Mphil_Department': Education_Info.Mphil_Department,
            'Education_Info.Mphil_Class': Education_Info.Mphil_Class,
            'Education_Info.Mphil_Year_Of_Passing': Education_Info.Mphil_Year_Of_Passing,
            'Education_Info.Mphil_College_Name': Education_Info.Mphil_College_Name,
            'Education_Info.Mphil_CGPA': Education_Info.Mphil_CGPA,
            'Education_Info.Mphil_Percentage': Education_Info.Mphil_Percentage,
            'Education_Info.Mphil_Medium': Education_Info.Mphil_Medium, 
            'Education_Info.PHD_Course': Education_Info.PHD_Course,
            'Education_Info.PHD_Department': Education_Info.PHD_Department,
            'Education_Info.PHD_Class': Education_Info.PHD_Class,
            'Education_Info.PHD_Year_Of_Passing': Education_Info.PHD_Year_Of_Passing,
            'Education_Info.PHD_College_Name': Education_Info.PHD_College_Name,
            'Education_Info.PHD_CGPA': Education_Info.PHD_CGPA,
            'Education_Info.PHD_Percentage': Education_Info.PHD_Percentage,
            'Education_Info.PHD_Medium': Education_Info.PHD_Medium,
            'Education_Info.Bed_Course': Education_Info.Bed_Course,
            'Education_Info.Bed_Department': Education_Info.Bed_Department,
            'Education_Info.Bed_Class': Education_Info.Bed_Class,
            'Education_Info.Bed_Year_Of_Passing': Education_Info.Bed_Year_Of_Passing,
            'Education_Info.Bed_College_Name': Education_Info.Bed_College_Name,
            'Education_Info.Bed_CGPA': Education_Info.Bed_CGPA,
            'Education_Info.Bed_Percentage': Education_Info.Bed_Percentage,
            'Education_Info.Bed_Medium': Education_Info.Bed_Medium,
            'Education_Info.Med_Course': Education_Info.Med_Course,
            'Education_Info.Med_Department': Education_Info.Med_Department,
            'Education_Info.Med_Class': Education_Info.Med_Class,
            'Education_Info.Med_Year_Of_Passing': Education_Info.Med_Year_Of_Passing,
            'Education_Info.Med_College_Name': Education_Info.Med_College_Name,
            'Education_Info.Med_CGPA': Education_Info.Med_CGPA,
            'Education_Info.Med_Percentage': Education_Info.Med_Percentage,
            'Education_Info.Med_Medium': Education_Info.Med_Medium,
            'Education_Info.Other1_Course': Education_Info.Other1_Course,
            'Education_Info.Other1_Department': Education_Info.Other1_Department,
            'Education_Info.Other1_Class': Education_Info.Other1_Class,
            'Education_Info.Other1_Year_Of_Passing': Education_Info.Other1_Year_Of_Passing,
            'Education_Info.Other1_College_Name': Education_Info.Other1_College_Name,
            'Education_Info.Other1_CGPA': Education_Info.Other1_CGPA,
            'Education_Info.Other1_Percentage': Education_Info.Other1_Percentage,
            'Education_Info.Other1_Medium': Education_Info.Other1_Medium,
            'Education_Info.Other2_Course': Education_Info.Other2_Course,
            'Education_Info.Other2_Department': Education_Info.Other2_Department,
            'Education_Info.Other2_Class': Education_Info.Other2_Class,
            'Education_Info.Other2_Year_Of_Passing': Education_Info.Other2_Year_Of_Passing,
            'Education_Info.Other2_College_Name': Education_Info.Other2_College_Name,
            'Education_Info.Other2_CGPA': Education_Info.Other2_CGPA,
            'Education_Info.Other2_Percentage': Education_Info.Other2_Percentage,
            'Education_Info.Other2_Medium': Education_Info.Other2_Medium,
            'Education_Info.Guide_ship': Education_Info.Guide_ship,
            'Education_Info.Guide_ship_No': Education_Info.Guide_ship_No,
            'Education_Info.SET_Qualified': Education_Info.SET_Qualified,
            'Education_Info.SET_QualifiedYear': Education_Info.SET_QualifiedYear,



            'Activity_Info.Experience': Activity_Info.Experience,
            'Activity_Info.Teaching_Experience': Activity_Info.Teaching_Experience,
            'Activity_Info.Industry_Experience': Activity_Info.Industry_Experience,
            'Activity_Info.No_Of_FDP_Attended': Activity_Info.No_Of_FDP_Attended,
            'Activity_Info.No_Of_Workshop_Attended': Activity_Info.No_Of_Workshop_Attended,
            'Activity_Info.No_Of_Conference_Attended': Activity_Info.No_Of_Conference_Attended,
            'Activity_Info.No_Of_Symposium_Attended': Activity_Info.No_Of_Symposium_Attended,
            'Activity_Info.No_Of_FDP_Organized': Activity_Info.No_Of_FDP_Organized,
            'Activity_Info.No_Of_Workshop_Organized': Activity_Info.No_Of_Workshop_Organized,
            'Activity_Info.No_Of_Conference_Organized': Activity_Info.No_Of_Conference_Organized,
            'Activity_Info.No_Of_Symposium_Organized': Activity_Info.No_Of_Symposium_Organized,
            'Activity_Info.No_Of_Monograph_Published': Activity_Info.No_Of_Monograph_Published,
            'Activity_Info.No_Of_Books_Published': Activity_Info.No_Of_Books_Published,
            'Activity_Info.No_Of_Chapter_in_Inherited_Books': Activity_Info.No_Of_Chapter_in_Inherited_Books,
            'Activity_Info.No_Of_Paper_Published_InJournals': Activity_Info.No_Of_Paper_Published_InJournals,
            'Activity_Info.No_Of_Papers_InConference': Activity_Info.No_Of_Papers_InConference,
            'Activity_Info.No_Of_Citations': Activity_Info.No_Of_Citations,
            'Activity_Info.No_Of_H_Index': Activity_Info.No_Of_H_Index,
            'Activity_Info.No_Of_I10_Index': Activity_Info.No_Of_I10_Index,
            'Activity_Info.No_Of_Project_Guided_UG': Activity_Info.No_Of_Project_Guided_UG,
            'Activity_Info.No_Of_Project_Guided_PG': Activity_Info.No_Of_Project_Guided_PG,
            'Activity_Info.No_Of_Project_Guided_PHD': Activity_Info.No_Of_Project_Guided_PHD,
            'Activity_Info.Patent': Activity_Info.Patent,
            'Activity_Info.Achievements_Awards': Activity_Info.Achievements_Awards,
            'Activity_Info.Research_Found': Activity_Info.Research_Found,
            'Activity_Info.Research_Found_Amount': Activity_Info.Research_Found_Amount,
            'Activity_Info.Contact_Industries': Activity_Info.Contact_Industries,
            'Activity_Info.Contact_Industries_Count': Activity_Info.Contact_Industries_Count,
            'Activity_Info.Interested_Game': Activity_Info.Interested_Game,
            'Activity_Info.Activities': Activity_Info.Activities,
            'Activity_Info.Special_Achievements': Activity_Info.Special_Achievements,
            'Activity_Info.Joining_Time': Activity_Info.Joining_Time,
            'Activity_Info.Expected_Salary': Activity_Info.Expected_Salary,


            'Reference_Info.Family_in_SNS': Reference_Info.Family_in_SNS,
            'Reference_Info.Family_in_SNS_Details': Reference_Info.Family_in_SNS_Details,
            'Reference_Info.Reference1_Name': Reference_Info.Reference1_Name,
            'Reference_Info.Reference2_Name': Reference_Info.Reference2_Name,
            'Reference_Info.Reference1_Designation': Reference_Info.Reference1_Designation,
            'Reference_Info.Reference2_Designation': Reference_Info.Reference2_Designation,
            'Reference_Info.Reference1_Organization': Reference_Info.Reference1_Organization,
            'Reference_Info.Reference2_Organization': Reference_Info.Reference2_Organization,
            'Reference_Info.Reference1_Contact_Number': Reference_Info.Reference1_Contact_Number,
            'Reference_Info.Reference2_Contact_Number': Reference_Info.Reference2_Contact_Number,
            'Reference_Info.Reference1_Email_Id': Reference_Info.Reference1_Email_Id,
            'Reference_Info.Reference2_Email_Id': Reference_Info.Reference2_Email_Id,
            'Reference_Info.Place': Reference_Info.Place,
            'Reference_Info.Date': Reference_Info.Date,


            'Files.Cover_Later': Cover_Later[0],
            'Files.Photo': Photo[0],
            'Files.Signature': Sign[0],

            Status: 'Active',
            Stage: 1,
            FormType: Basic_Info.FormType.value

         });
         VarCandidatesSchema.save(function(err, result) {
            if(err) {
               console.log(err);
               
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Candidate Form Submit Query Error', 'Candidate.controller.js', err);
               res.status(417).send({Status: false, Error:err, Message: "Some error occurred while Submit The Form"});           
            } else {
               res.status(200).send({Status: true, Message: 'Your Resume Successfully Applied' });
            }
         });
      }
   });
};