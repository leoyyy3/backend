const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

var Schema = mongoose.Schema

let articleSchema = new Schema({
    title: {
        type:String
    },
    url: {
        type:String
    },
    description: {
        type:String
    },
    keyword: {
        type: String,
        default: ""
    },
    tags: {
        type: Array,
    },
    content: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createTime: {
        type: Date,
        default: Date.now
    }
},{collection:'articellist'})

module.exports = mongoose.model('Person', articleSchema)
