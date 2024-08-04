const mongoose = require("mongoose");

const ServicesSchema = new mongoose.Schema({
    service_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    facility: [
        {
            name: {
                type:String
            },
            details:{
                type: String
            }
        }
    ]
});


module.exports = mongoose.model("Service", ServicesSchema)
