var CryptoJS = require("crypto-js");
var DesignationModel = require('./../../models/Settings/Designation.model.js');
var mongoose = require('mongoose');



// Designation List -----------------------------------------------
   exports.Designation_List = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         DesignationModel.DesignationSchema
            .find({ 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
            .populate({ path: 'Created_By', select: 'Name' })
            .populate({ path: 'Last_Modified_By', select: 'Name' })
            .exec(function(err, result) { // Designation FindOne Query
            if(err) {
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Designations!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };