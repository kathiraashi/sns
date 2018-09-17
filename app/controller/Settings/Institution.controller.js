var CryptoJS = require("crypto-js");
var InstitutionModel = require('./../../models/Settings/Institution.model.js');
var mongoose = require('mongoose');

// Institution Simple List -----------------------------------------------
   exports.Institution_SimpleList = function(req, res) {

      InstitutionModel.InstitutionSchema.find({ 'If_Deleted': false }, { Institution : 1, Image: 1 }, {sort: { updatedAt: 1 }}, function(err, result) { // Institution FindOne Query
         if(err) {
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Institutions!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   };
   // Institution View -----------------------------------------------
   exports.Institution_View = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.Institution_Id || ReceivingData.Institution_Id === ''  ) {
         res.status(400).send({Status: false, Message: "Institution Details can not be empty" });
      }else {
         InstitutionModel.InstitutionSchema
            .findOne({ _id: ReceivingData.Institution_Id }, {}, {})
            .populate({ path: 'Departments', select: ['Department'] })
            .exec(function(err, result) { // Institution FindOne Query
            if(err) {
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Institutions!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };