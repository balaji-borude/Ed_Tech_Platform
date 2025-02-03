const mongoose = require("mongoose");
const SubSection = require("./SubSection");

const SectionShema = new mongoose.Schema({
    sectionName:{
        type:String,
    },
    SubSection:{
            type : mongoose.Schema.Types.ObjectId,
            trim:true,
            ref:"subSecction"
    }

   
});

module.exports = new mongoose.model("Section", SectionShema);