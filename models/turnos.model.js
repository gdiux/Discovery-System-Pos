const { Schema, model } = require('mongoose');

// ABONOS SCHEMA
const SalesSchema = Schema({
    facturas: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice'
    }
});

// MOVIMIENTOS SCHEMA
const MovementsSchema = Schema({
    descripcion: {
        type: String
    },
    monto: {
        type: Number
    },
    type: {
        type: String
    }
});

// ABONOS SCHEMA
const AbonoSchema = Schema({
    factura: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice'
    },
    monto: {
        type: Number
    }
});

// INVOICE SCHEMA
const TurnoSchema = Schema({

    cajero: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    caja: {
        type: Schema.Types.ObjectId,
        ref: 'Caja',
        require: true
    },
    initial: {
        type: Number,
        require: true
    },
    sales: [SalesSchema],
    abonos: [AbonoSchema],
    movements: [MovementsSchema],
    status: {
        type: Boolean,
        default: true
    },
    cerrado: {
        type: Boolean,
        default: false
    },
    diferencia: {
        type: Boolean,
        default: false
    },
    montoD: {
        type: Number
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    cierre: {
        type: Date
    }

});


TurnoSchema.method('toJSON', function() {

    const { __v, _id, ...object } = this.toObject();
    object.tid = _id;
    return object;

});


// invoice

module.exports = model('Turno', TurnoSchema);