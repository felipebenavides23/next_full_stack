const Usuario = require('../models/Usuarios')
const Productos = require('../models/productos')
const Cliente = require('../models/Cliente')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require("dotenv").config({ path: "variable.env" })


const CrearToken = (usuario, secreta, expiresIn) => {
    console.log(usuario)
    const { id, email, nombre, apellido } = usuario
    return jwt.sign({ id, email, nombre }, secreta, { expiresIn })
}

// resolver 
const resolvers = {
    Query: {
        // usuarios
        obtenerUsuario: async (_, { token }) => {
            const usuarioId = await jwt.verify(token, process.env.SECRETA)

            return usuarioId
        },
        // productos
        obtenerProducto: async () => {
            try {
                const resultadoProducto = await Productos.find()
                return resultadoProducto
            } catch (error) {
                console.log(error);
            }
        },
        obtenerProductoId: async (__, { id }) => {
            // revisar la existencia del producto 
            const producto = await Productos.findById(id)
            if (!producto) {
                throw new Error("producto no encontrado")
            }

            return producto
        },
        obtenerCliente: async () => {
            try {
                const resultadoCliente = await Cliente.find()
                return resultadoCliente
            } catch (error) {
                console.log(error);
            }
        },
        obtenerClienteVerdedor: async (__, { }, ctx) => {
            try {
                const resultadoCliente = await Cliente.find({ vendedor: ctx.id.toString() })
                console.log(resultadoCliente[1].apellido);
                return resultadoCliente
            } catch (error) {
                console.log(error);
            }
        },
        obtenersolocliente: async (__, { id }, ctx) => {

            try {
                const cliente_u = await Cliente.findById(id)

                if (!cliente_u) {
                    throw new Error("el cliente no existe ")
                    console.log("el cliente no existe");
                }

                if (cliente_u !== ctx.is.toString()) {
                    throw new Error("no es tu cliente")
                }

                return cliente_u
            } catch (error) {
                console.log(error);
            }
        }
    },

    Mutation: {

        // mutacion de usuarios 
        nuevoUsuario: async (__, { input }) => {

            const { email, password } = input


            // revisar si el email ya existe 
            const existeUsuario = await Usuario.findOne({ email })


            if (existeUsuario) {
                throw new Error("no puede existir dos usuario exactos ")
            }
            // hashear password 

            const salt = await bcryptjs.genSaltSync(10)
            input.password = await bcryptjs.hashSync(password, salt)


            // guardar en la base de datos 

            try {
                const usuario = new Usuario(input)
                usuario.save()
                return usuario
            } catch (error) {
                console.log(error)
            }


        },

        autenticarUsurio: async (__, { input }) => {
            const { email, password } = input
            // existencia del usuario 
            const ExisteUsuario = await Usuario.findOne({ email })
            if (!ExisteUsuario) {
                throw new Error("el usuario no existe en la base de datos")
            }
            // revisar pasword  que este correcto 
            const passwordCorrecto = await bcryptjs.compareSync(password, ExisteUsuario.password)

            if (!passwordCorrecto) {
                throw new Error(" la contraseña no es correcta")
            }
            // creacion de token 

            return {
                token: CrearToken(ExisteUsuario, process.env.SECRETA, '24h')
            }
        },
        // mutacion productos
        nuevoProducto: async (__, { input }) => {
            try {
                const producto = new Productos(input)
                const resultado = await producto.save()
                return resultado
            } catch (error) {
                console.log(error);
            }
        },
        actualizarProducto: async (__, { id, input }) => {
            let producto = await Productos.findById(id)
            if (!producto) {
                throw new Error("producto no encontrado")
            }

            producto = await Productos.findByIdAndUpdate({ _id: id }, input, { new: true })
            return producto
        },
        eliminarProducto: async (__, { id }) => {
            let producto = await Productos.findById(id)
            if (!producto) {
                throw new Error("producto no encontrado")
            }
            await Productos.findOneAndDelete({ _id: id })
            return "el producto fue eliminado con exito "
        },

        // mutaciones clientes 
        nuevoCliente: async (__, { input }, ctx) => {

            console.log(ctx);
            // validar si el e cliente ya exsite 
            const { email } = input
            const cliente = await Cliente.findOne({ email })
            if (cliente) {
                throw new Error("le cliente ya esta creado")
            }
            const nuevocliente = new Cliente(input)
            // valivar vendedor 
            nuevocliente.vendedor = ctx.id
            // guardar cliente 

            try {
                const resultado = await nuevocliente.save()
                return resultado
            } catch (error) {
                console.log(error);

            }
        },
        actualizarCliente: async (__, { id, input }, ctx) => {
            let resultado_Cliente = await Cliente.findById(id)
            if (!resultado_Cliente) {
                console.log("el cliente no existe");
            }

            if (resultado_Cliente.vendedor == ctx.id.toString()) {
                resultado_Cliente = await Cliente.findByIdAndUpdate({ _id: id }, input, { new: true })
                return resultado_Cliente
            }
            console.log("elvendedor no es el correcto ");

        }

    }

}

module.exports = resolvers 