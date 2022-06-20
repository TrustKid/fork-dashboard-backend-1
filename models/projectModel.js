const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    isNew: { type: Boolean },
    image: { type: String },
    user: { type: String, },
    avatar: { type: String, required: false },
    landing: { type: Boolean, required: false },
    featured: { type: Boolean, required: false },
    hot: { type: Boolean, required: false },
    trending: { type: Boolean, required: false },
    top: { type: Boolean, required: false },
    ruged: { type: Boolean, required: false },
    dead: { type: Boolean, required: false },
    approved: { type: Boolean, required: false },
    hosts: { type: Number, required: false },
    forkName: { type: String, required: false },
    network: { type: String, required: false },
    description: { type: String, required: false },
    launchDate: { type: Number, required: false },
    checkValue: { type: String },
    socialData: { type: Object, required: false },
    functionData: { type: Array },
    functionalityData: { type: Array },
    fork: { type: String, require: false },
    watchlist: { type: Boolean },
    created_at: { type: Number },
    launchDateSearch: { type: String }
});

module.exports = mongoose.model('project', ProjectSchema);