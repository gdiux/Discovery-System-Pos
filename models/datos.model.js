const { Schema, model } = require('mongoose');

const DatoSchema = Schema({

    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    nit: {
        type: String,
        require: true
    },
    tax: {
        type: Number,
        default: 0,
        require: true
    },
    logo: {
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

DatoSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.eid = _id;
    return object;

});

module.exports = model('Datos', DatoSchema);