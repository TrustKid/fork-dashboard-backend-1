const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    token_name: { type: String },
    token_symbol: { type: String },
    token_decimals: { type: String },
    token_address: { type: String },
    total_supply: { type: String },
    presale_tokens: { type: String },
    liquidity_tokens: { type: String },
    presale_rate: { type: String },
    listing_rate: { type: String },
    initial_market_cap: { type: String },
    total_raise: { type: String },
    uniqueId: { type: String },
});

module.exports = mongoose.model('tokenInfo', ProjectSchema);