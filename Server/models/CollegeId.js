const mongoose = require("mongoose");

const collegeIdSchema = new mongoose.Schema({
    collegeID: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("CollegeId",collegeIdSchema);