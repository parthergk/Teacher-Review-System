const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
    collegeName: {
        type : String,
    },
    departmentName: {
        type: String,
    },
    teacherName : {
        type: String
    },
    rating:{
        type: Number
    },
    review:{
        type:String
    },
    submit_on :{
        type: Date
    }
})

module.exports = mongoose.model('Review',reviewsSchema);
