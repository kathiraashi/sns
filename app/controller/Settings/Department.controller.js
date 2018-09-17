var CryptoJS = require("crypto-js");
var DepartmentModel = require('./../../models/Settings/Department.model.js');
var mongoose = require('mongoose');



// Department List -----------------------------------------------
   exports.Department_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         DepartmentModel.DepartmentSchema
            .find({ 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .exec(function(err, result) { // Department FindOne Query
            if(err) {
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Departments!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
// Department Simple List -----------------------------------------------
   exports.Department_SimpleList = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         DepartmentModel.DepartmentSchema.find({ 'If_Deleted': false }, { Department : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Department FindOne Query
            if(err) {
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Departments!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };
