const { gql } = require('apollo-server')


// schema 
const typeDefs = gql`
    # types y input de usuarios
    type Usuario{
        id:ID
        nombre:String
        apellido: String
        email:String
        creado:String
     
    }
    type Token{
        token: String
    }
    input UsuarioInput{
        nombre:String!
        apellido:String!
        email:String!
        password:String!
    }
    input AutenticarInput{
        email:String!  
        password:String!
    }
    #types y input de productos 

    input ProductoInput{
        nombre: String!
        existencia: Int!
        precio: Float!
    }

    type Producto{
        id:ID
        nombre: String
        existencia: Int
        precio: Float
        creado: String
    }

    # types y input de cliente 

    input inputCliente{
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        telefono: String
    } 

    type Cliente{
        id:ID
        nombre: String
        apellido: String
        empresa: String
        email: String
        telefono: String
        creacion:String
        vendedor: ID
    }



   type Query{
    #       usuarios
        obtenerUsuario(token:String!): Usuario
    #       producto
        obtenerProducto: [Producto]
        obtenerProductoId(id:ID!): Producto
    #   cliente
        obtenerCliente: [Cliente] 
        obtenerClienteVerdedor:[Cliente]
        obtenersolocliente(id:ID!): Cliente
   }
   type Mutation{
    #    usuarios
        nuevoUsuario(input:UsuarioInput): Usuario
        autenticarUsurio(input:AutenticarInput): Token 
    #   productos 
        nuevoProducto(input:ProductoInput): Producto
        actualizarProducto(id: ID, input:ProductoInput) : Producto
        eliminarProducto(id:ID): String
    #   clientes 
        nuevoCliente(input: inputCliente ): Cliente
        actualizarCliente(id: ID, input: inputCliente): Cliente
   }
`
module.exports = typeDefs