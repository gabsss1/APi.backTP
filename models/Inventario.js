const mongoose = require('mongoose');

const InventarioSchema = mongoose.Schema({
    producto: {type:mongoose.Schema.ObjectId, ref:'producto',required: true},
    cantidad: {type: Number, required: true},
    admin: {type: mongoose.Schema.ObjectId, ref:'admin', required: true },
    proveedor: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

module.exports = mongoose.model('inventario',InventarioSchema);