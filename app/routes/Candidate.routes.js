module.exports = function(app) {

    var Controller = require('../controller/Candidate.controller.js');

    app.post('/API/Candidate/Pan_AsyncValidate', Controller.Pan_AsyncValidate);
    app.post('/API/Candidate/Contact_AsyncValidate', Controller.Contact_AsyncValidate);
    app.post('/API/Candidate/Email_AsyncValidate', Controller.Email_AsyncValidate);

    app.post('/API/Candidate/Candidate_Submit', Controller.Candidate_Submit);

    app.post('/API/Candidate/Online_Exam', Controller.Online_Exam);
    app.post('/API/Candidate/Online_Exam_Qus_Submit', Controller.Online_Exam_Qus_Submit);
    app.post('/API/Candidate/Online_Exam_Qus_Later', Controller.Online_Exam_Qus_Later);
    app.post('/API/Candidate/Online_Exam_Submit', Controller.Online_Exam_Submit);

};
