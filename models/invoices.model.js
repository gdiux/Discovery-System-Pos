const { Schema, model, connection } = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(connection);

// PRODUCTS SCHEMA
const ProductosSchema = Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
});

// Payment SCHEMA
const PaymentSchema = Schema({
    type: {
        type: String
    },
    amount: {
        type: Number
    },
    description: {
        type: String
    }
});

// INVOICE SCHEMA
const InvoiceSchema = Schema({

    invoice: {
        type: Number
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Clients',
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    products: [ProductosSchema],
    type: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    payments: [PaymentSchema],
    credito: {
        type: Boolean,
        default: false
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


InvoiceSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.iid = _id;
    return object;

});

InvoiceSchema.plugin(autoIncrement.plugin, {
    model: 'Invoice',
    field: 'invoice',
    startAt: process.env.INVOICE_INIT
});


// invoice

module.exports = model('Invoice', InvoiceSchema);