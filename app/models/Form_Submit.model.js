var mongoose = require('mongoose');

var Form_SubmitSchema = mongoose.Schema({
    Basic_Info : {
        Applied_For: { type : String , required : true },
        Department: { type : String , required : true },
        Preferred_Subject_1: { type : String },
        Preferred_Subject_2: { type : String },
        Preferred_Subject_3: { type : String },
        Preferred_Lab_1: { type : String },
        Preferred_Lab_2: { type : String },
    },
    Personal_Info : {
        Name: { type : String , required : true },
        Date_of_Birth: { type : Date },
        Age: { type : String },
        Gender: { type : String },
        Place_of_Birth: { type : String },
        Nationality: { type : String },
        Religion: { type : String },
        Community: { type : String },
        Caste: { type : String },
        Aadhar_No: { type : String },
        PAN_No: { type : String },
        Contact_No: { type : String },
        Email: { type : String },
        Permanent_Address: {
            Door_No: { type : String },
            Street: { type : String },
            City: { type : String },
            Pin_Code: { type : String },
        },
        Address_are_Same: { type : String },
        Present_Address: {
            Door_No: { type : String },
            Street: { type : String },
            City: { type : String },
            Pin_Code: { type : String },
        },
        Marital_Status: { type : String },
        Family_Details: {
            Father: {
                Name: { type : String },
                Designation: { type : String },
                Organization: { type : String },
                Locality: { type : String },
                Contact_No: { type : String },
            },
            Mother: {
                Name: { type : String },
                Designation: { type : String },
                Organization: { type : String },
                Locality: { type : String },
                Contact_No: { type : String },
            },
            Spouse: {
                Name: { type : String },
                Designation: { type : String },
                Organization: { type : String },
                Locality: { type : String },
                Contact_No: { type : String },
            }
        },
        Number_of_Siblings: { type : String },
        Number_of_Kids: { type : String },
        Kids_Details: {type : Array },
    },
    Education_Info: {
        SSLC_Details: {
            School_Name: { type : String },
            Medium: { type : String },
            Year_of_Passing: { type : String },
            Percentage: { type : String },
        },
        HSC_Details: {
            School_Name: { type : String },
            Medium: { type : String },
            Year_of_Passing: { type : String },
            Percentage: { type : String },
        },
        UG_Details: {
            Course: { type : Object },
            Year_of_Passing: { type : String },
            College_name: { type : String },
            Percentage: { type : String },
            History_of_Arrears: { type : String },
        },
        PG_Details: {
            Course: { type : Object },
            Year_of_Passing: { type : String },
            College_name: { type : String },
            Percentage: { type : String },
            History_of_Arrears: { type : String },
        },
        PHD_Details: {
            Course_Status: { type : Object },
            Year_of_Completion: { type : String },
            University_name: { type : String },
        }
    },
    Experience_Activities_Info: {
        If_Experienced: { type : String},
        No_of_Years_Experienced: { type : String},
        Experience_Info: {
            Field_Of_Experience: { type : Object },
            Institute_Name: { type : String},
            Works_Handled: { type : String},
            Subjects_Handled: { type : String},
            Working_Duration: { type : String},
        },
        Activities_Info : {
            Workshop_Info: {
                Attended_As: { type : Object },
                Institute: { type : String },
                Domain: { type : String },
            },
            Paper_Presentation_Info: {
                Attended_As: { type : Object },
                Institute: { type : String },
                Domain: { type : String },
                Title: { type : String },
            },
            Project_Presentation_Info: {
                Attended_As: { type : Object },
                Institute: { type : String },
                Domain: { type : String },
                Title: { type : String },
            },
            UG_Project_Info: {
                Domain: { type : String },
                Title: { type : String },
            },
            PG_Project_Info: {
                Domain: { type : String },
                Title: { type : String },
            },
            Pattron_Info: {
                Domain: { type : String },
                Title: { type : String },
            },
        },
        Intrested_Game: { type : String },
        Achievements: { type : String },
        Activities: { type : String },
        Special_Achievements: { type : String },
        Joining_Time: { type : String },
        Expected_Salary: { type : String },
    },
    Reference_Info: {
        Reference_1: {
            Name: { type : String },
            Designation: { type : String },
            Organization: { type : String },
            Contact_No: { type : String },
            Email: { type : String },
        },
        Reference_2: {
            Name: { type : String },
            Designation: { type : String },
            Organization: { type : String },
            Contact_No: { type : String },
            Email: { type : String },
        },
        Place: { type : String },
        Date: { type : String },
    }
}, { timestamps: true });


var varSubmited_Forms = mongoose.model('Submited_Forms', Form_SubmitSchema, 'Submited_Forms');

module.exports = {
    Form_SubmitSchema : varSubmited_Forms
};