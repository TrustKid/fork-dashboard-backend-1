const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LandingPageAds = new Schema({
    adsGallery: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    created_at: { type: Number },
    interval: { type: Number }
});

module.exports = mongoose.model('LandingPageAds', LandingPageAds);