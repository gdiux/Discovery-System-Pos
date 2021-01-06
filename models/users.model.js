const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    usuario: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'STAFF',
        require: true
    },
    address: {
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

UserSchema.method('toJSON', function() {

    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;

});

module.exports = model('User', UserSchema);