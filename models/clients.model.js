const { Schema, model } = require('mongoose');

const ClientSchema = Schema({

    name: {
        type: String,
        require: true
    },
    cedula: {
        type: String,
        require: true,
        unique: true
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    department: {
        type: String
    },
    zip: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }

});

ClientSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.cid = _id;
    return object;

});

module.exports = model('Clients', ClientSchema);