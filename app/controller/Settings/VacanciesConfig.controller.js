var CryptoJS = require("crypto-js");
var VacanciesConfigModel = require('./../../models/Settings/VacanciesConfig.model.js');
var mongoose = require('mongoose');


   // Vacancies Config List -----------------------------------------------
   exports.VacanciesConfig_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.Institution_Id || ReceivingData.Institution_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Institution Details can not be empty" });
      }else {
         VacanciesConfigModel.VacanciesConfigSchema
            .find(   { 'If_Deleted': false, 'Active_Status': true, Institution: mongoose.Types.ObjectId(ReceivingData.Institution_Id)  },
                     { Institution: 1, Department: 1, Designation: 1, JobDescription: 1,JobResponsibility: 1 },
                     { sort: { updatedAt: -1 }} )
            .populate({ path: 'Institution', select: 'Institution' })
            .populate({ path: 'Department', select: ['Department', 'Department_Code'] })
            .populate({ path: 'Designation', select: 'Designation' })
            .exec(function(err, result) {
            if(err) {
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Vacancies List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

   // Vacancy Details -----------------------------------------------
   exports.VacancyComplete_Details = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.Vacancy_Id || ReceivingData.Vacancy_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Vacancy Details can not be empty" });
      }else {
         VacanciesConfigModel.VacanciesConfigSchema
            .findOne( { _id: mongoose.Types.ObjectId(ReceivingData.Vacancy_Id)  }, { Institution: 1, Department: 1, Designation: 1}, {} )
            .populate({ path: 'Institution', select: ['Institution', 'Image', 'Institution_Category', 'Institution_Code'] })
            .populate({ path: 'Department', select: ['Department', 'Department_Code'] })
            .populate({ path: 'Designation', select: 'Designation' })
            .exec(function(err, result) {
            if(err) {
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Vacancies List!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };

