const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ForkSchema = new Schema({
    fork: {type: String},
    state: {type:Boolean},
    created_at:{type: Number}
});

module.exports = mongoose.model('fork', ForkSchema);