const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    telefono: {type: String, required: true},
    rol: {type: String, default: 'admin', required: true},
    dni: {type: String, required: true},
});

module.exports = mongoose.model('admin',AdminSchema);