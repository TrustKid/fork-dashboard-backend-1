const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    role: {type: Number},
    dead: {type: Boolean},
    created_at:{type: Number}
});

module.exports = mongoose.model('user', UserSchema);