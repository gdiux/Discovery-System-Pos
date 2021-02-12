const { Schema, model } = require('mongoose');

const CajaSchema = Schema({

    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    turno: {
        type: Schema.Types.ObjectId,
        ref: 'Turno'
    },
    cajero: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    cerrada: {
        type: Boolean,
        default: true
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

CajaSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.caid = _id;
    return object;

});

module.exports = model('Caja', CajaSchema);