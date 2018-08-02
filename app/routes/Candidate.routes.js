module.exports = function(app) {

    var Controller = require('../controller/Candidate.controller.js');

    app.post('/API/Candidate/Aadhar_AsyncValidate', Controller.Aadhar_AsyncValidate);
    app.post('/API/Candidate/Contact_AsyncValidate', Controller.Contact_AsyncValidate);
    app.post('/API/Candidate/Email_AsyncValidate', Controller.Email_AsyncValidate);

    app.post('/API/Candidate/Candidate_Submit', Controller.Candidate_Submit);

};
