const mongoose  = require("mongoose")
const validator = require("validator")
const OwnerSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type:String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid!")
            }
        }
    },
    address: {
        type: String,
        required: true,
        trim: true,
    }
})

module.exports = mongoose.model("Owner", OwnerSchema)

