const mongoose  = require("mongoose")
const validator = require("validator")
const PetSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true,
    },
    specie:{
        type: String,
        required: true,
        trim: true,
        enum: ['dog', 'cat', 'bird', 'fish', 'reptile', 'other'],
        default: 'other'
    },
    race: {
        type: String,
        required: true,
        trim: true,
    }
})

module.exports = mongoose.model("Pet", PetSchema)

