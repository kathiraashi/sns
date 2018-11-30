var CryptoJS = require("crypto-js");
var ExamDetailsModel = require('./../../models/Settings/ExamDetails.model.js');



// ************************************************** ExamDetails *****************************************************  
// ExamDetails List -----------------------------------------------
   exports.ExamDetails_List = function(req, res) {
         ExamDetailsModel.ExamDetailsSchema
            .find({ 'If_Deleted': false }, {ExamDetails: 1}, {sort: { updatedAt: -1 }})
            .exec(function(err, result) { // ExamDetails FindOne Query
            if(err) {
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Exam Details!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
   };
