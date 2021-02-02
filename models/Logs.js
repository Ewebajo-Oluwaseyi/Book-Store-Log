const mongoose = require('mongoose');

const LogsSchema = mongoose.Schema({
    bookTitle: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    publishDate: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    returned: {
        type: Boolean,
        default: false
    },
    borrowed: {
        type: Date
    },
    logger: {
        type: String
    }
})

module.exports = mongoose.model('logs', LogsSchema)