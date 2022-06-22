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
        },
        adLink: {
            type: String,
            required: true
        }
    }],
    created_at: { type: Number },
    interval: { type: Number },
    position: { type: String },
    category: { type: String },
    enable: { type: String },
    id: { type: String },
    linkset: [
        {
            id: {
                type: Number,
                required: true
            },
            link: {
                type: String,
                required: true
            },
        }
    ]
});

module.exports = mongoose.model('LandingPageAds', LandingPageAds);