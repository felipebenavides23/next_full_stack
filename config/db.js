const mongoose = require("mongoose")
require("dotenv").config({ path: "variable.env" })

const conectarDB = async () => {

    try {

        await mongoose.connect(process.env.bd_mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log("esta conectada a la base de datos ")
    } catch (error) {
        console.log("no se conecto de forma correcta  a la base de datos")
        console.log(error)
        process.exit(1) // linea de codigo para detener la aplicacion 
    }
}

module.exports = conectarDB