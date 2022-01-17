const mongoose = require('mongoose')
const addSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true
    },
    isDeliveryAddress: {
        type: String,
        required: true,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Address",addSchema);