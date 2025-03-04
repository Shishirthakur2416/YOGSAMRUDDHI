const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    excerpt: String,
    body: String,
    slug: {
        type: String,
        unique: true,
        required: true
    },

    blogImg: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // The name of the model you're referencing
        required: true, // Makes sure the field is always populated
    }
}, { timestamps: true })

module.exports = mongoose.model('Blog', BlogSchema)