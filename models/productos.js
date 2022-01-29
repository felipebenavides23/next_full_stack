const mongoose = require('mongoose')

const ProductoSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: true,
        trim: true // linea para eliminar los espacios en banco an comienzo y al final de input
    },
    existencia: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('producto', ProductoSchema)