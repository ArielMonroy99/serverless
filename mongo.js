const mongoose = require("mongoose")
mongoose.Promise = global.Promise

module.exports = async () => {
    try {
        console.log("Connecting!")
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected to database!")
    } catch (err) {
        console.log("Error connecting to database!")
        console.log(err)
    }
}