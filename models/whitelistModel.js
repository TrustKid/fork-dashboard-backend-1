const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WhitelistSchema = new Schema({
    image:{type: String},
    project: {type: String},
    network: {type: String},
    whitelist: {type: Boolean},
    website: {type: String},
    created_at:{type: Number}
});

module.exports = mongoose.model('whitelist', WhitelistSchema);