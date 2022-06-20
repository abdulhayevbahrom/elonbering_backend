const mongoose = require("mongoose")

const Product = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    year:{
        type:Number,
        // required:true
    },
    color:{
        type:String,
        // required:true
    },
    price:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true,
    },

    manzil:{
        type:String,
        required:true
    },

    type:{
        type:String,
        required:true
    },

    img:{
        type:String,
        required:true
    },

    date: { 
        type: Date,
        default: new Date()
    },

    maydoni:{
        type:Number,
        // required:true
    }

})


const model = mongoose.model("Product", Product);
module.exports = model;