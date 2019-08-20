const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

var Schema = mongoose.Schema

let tagsSchema = new Schema({
    name: {
        type: String
    },
    value: {
        type: String
    }
},{collection:'tags'})

module.exports = mongoose.model('Tags', tagsSchema)
