var FormSchema = require('../models/Form_Submit.model.JS');
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

    //     var varUserSchema = new UserModel.UserSchema({
    //         Email: req.body.Email,
    //         Password: req.body.Password,
    //         Color_Code: req.body.Color_Code || '',
    //         Image: req.body.Image || 'UserImage.png',
    //         DOB: req.body.DOB || '',
    //         City: req.body.City || '',
    //         Country: req.body.Country || '',
    //         Gender: req.body.Gender || '',
    //         Hash_Tag_1: req.body.Hash_Tag_1 || '',
    //         Hash_Tag_2: req.body.Hash_Tag_2 || '',
    //         Hash_Tag_3: req.body.Hash_Tag_3 || '',
    //         Show_Profile_To : 'Everyone',
    //         Active_Status: 'Active'
    //     });
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