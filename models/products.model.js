const { Schema, model } = require('mongoose');

const kitsSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    qty: {
        type: Number,
        require: true
    }
});

const ProductSchema = Schema({

    code: {
        type: Number,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    type: {
        type: String,
        require: true
    },
    kit: [kitsSchema],
    cost: {
        type: Number,
        require: true
    },
    gain: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    wholesale: {
        type: Number,
        require: true
    },
    department: {
        type: String,
        default: 'Sin Departamento'
    },
    stock: {
        type: Number
    },
    min: {
        type: Number
    },
    max: {
        type: Number
    },
    bought: {
        type: Number
    },
    sold: {
        type: Number
    },
    returned: {
        type: Number
    },
    damaged: {
        type: Number
    },
    img: {
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

ProductSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.pid = _id;
    return object;

});

module.exports = model('Product', ProductSchema);