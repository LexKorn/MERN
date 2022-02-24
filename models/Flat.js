const {Schema, model} = require('mongoose');

const schema = new Schema({
    room: {type: Number, default: 0},
    area: {type: Number, default: 0},
    price: {type: Number, default: 0},
    description: {type: String, required: true},    
    date: {type: Date, default: Date.now},
})

module.exports = model('Flat', schema);