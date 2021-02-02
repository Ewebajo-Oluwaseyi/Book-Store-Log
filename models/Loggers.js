const mongoose = require('mongoose');

const LoggersSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('loggers', LoggersSchema)