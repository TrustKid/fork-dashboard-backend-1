const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let NetworkSchema = new Schema({
    network: {type: String},
    image: {type: String},
    previousNetwork: {type: String},
    created_at:{type: Number}
});

module.exports = mongoose.model('network', NetworkSchema);