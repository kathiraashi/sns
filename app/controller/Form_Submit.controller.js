var FormModel = require('../models/Form_Submit.model.JS');
var ErrorManagement = require('./../../app/config/ErrorHandling.js');
var parser = require('ua-parser-js');
var get_ip = require('ipware')().get_ip;
var multer = require('multer');


// ---------------------------------------------------------------------- Online Form Submit ---------------------------------------------------------------
exports.Online_Form_Submit = function(req, res) {
    // console.log(req.body);
    res.status(200).send({Status:"True", Responce: req.body });
    
    // if(!req.body.Inscube_Name || req.body.Inscube_Name === '') {
    //     res.status(200).send({Status:"True", Output:"False", Message: "Inscube Name can not be empty" });
    // }else{

        var varFormSchema = new FormModel.FormSchema({
            Basic_Info : {
                Applied_For: req.body.Basic_Info.Post_Applied,
                Department: req.body.Basic_Info.Department,
                Preferred_Subject_1: req.body.Basic_Info.Preferred_Subject_1,
                Preferred_Subject_2: req.body.Basic_Info.Preferred_Subject_2,
                Preferred_Subject_3: req.body.Basic_Info.Preferred_Subject_3,
                Preferred_Lab_1: req.body.Basic_Info.Preferred_Lab_1,
                Preferred_Lab_2: req.body.Basic_Info.Preferred_Lab_1,
            },
            Personal_Info : {
                Name: req.body.Personal_Info.Name,
                Date_of_Birth: req.body.Personal_Info.DOB,
                Age: req.body.Personal_Info.Age,
                Gender: req.body.Personal_Info.Gender,
                Place_of_Birth: req.body.Personal_Info.Blace_of_Birth,
                Nationality: req.body.Personal_Info.Nationality,
                Religion: req.body.Personal_Info.Religion,
                Community: req.body.Personal_Info.Community,
                Caste: req.body.Personal_Info.Caste,
                Aadhar_No: req.body.Personal_Info.Aadhar_No,
                PAN_No: req.body.Personal_Info.PAN_No,
                Contact_No: req.body.Personal_Info.Contact_No,
                Email: req.body.Personal_Info.Email,
                Permanent_Address: {
                    Door_No: req.body.Personal_Info.Permanent_Door_No,
                    Street: req.body.Personal_Info.Permanent_Street,
                    City: req.body.Personal_Info.Permanent_City,
                    Pin_Code: req.body.Personal_Info.Permanent_Pin_Code,
                },
                Address_are_Same: req.body.Personal_Info.Address_Same,
                Present_Address: {
                    Door_No: req.body.Personal_Info.Present_Door_No,
                    Street: req.body.Personal_Info.Present_Street,
                    City: req.body.Personal_Info.Present_City,
                    Pin_Code: req.body.Personal_Info.Present_Pin_Code,
                },
                Marital_Status: req.body.Personal_Info.Marital_Status,
                Family_Details: {
                    Father: {
                        Name: req.body.Personal_Info.Father_Name,
                        Designation: req.body.Personal_Info.Father_Designation,
                        Organization: req.body.Personal_Info.Father_Organization,
                        Locality: req.body.Personal_Info.Father_Locality,
                        Contact_No: req.body.Personal_Info.Father_Contact_Number,
                    },
                    Mother: {
                        Name: req.body.Personal_Info.Mother_Name,
                        Designation: req.body.Personal_Info.Mother_Designation,
                        Organization: req.body.Personal_Info.Mother_Organization,
                        Locality: req.body.Personal_Info.Mother_Locality,
                        Contact_No: req.body.Personal_Info.Mother_Contact_Number,
                    },
                    Spouse: {
                        Name: req.body.Personal_Info.Spouse_Name,
                        Designation: req.body.Personal_Info.Spouse_Designation,
                        Organization: req.body.Personal_Info.Spouse_Organization,
                        Locality: req.body.Personal_Info.Spouse_Locality,
                        Contact_No: req.body.Personal_Info.Spouse_Contact_Number,
                    }
                },
                Number_of_Siblings: req.body.Personal_Info.No_Of_Siblings,
                Number_of_Kids: req.body.Personal_Info.No_Of_Kids,
                Kids_Details: req.body.Personal_Info.kids_List,
            },

        });
    //     varUserSchema.save(function(err, result) { // User Creation -----------------------------
    //         if(err) {
    //             ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'User Register Query Error', 'SignIn_SignUp.controller.js - 51', err);
    //             res.status(500).send({Status:"False", Error:err, Message: "Some error occurred while User Register"});           
    //         } else {
    //             res.status(200).send({Status:"True", Output:"False", Responce: result });
    //         }
    //     });
    // }
};