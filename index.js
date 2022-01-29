const { ApolloServer } = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/Resolver')
const conectardb = require('./config/db')
const jwt = require('jsonwebtoken')
require("dotenv").config({ path: "variable.env" })


// conexion a la base de datos 
conectardb()
// server 
const server = new ApolloServer({
    typeDefs, resolvers,

    context: ({ req }) => {
        // console.log(req.headers['authorization']);

        const token = req.headers['authorization'] || ''

        if (token) {

            console.log(token);
            try {

                const usuario = jwt.verify(token, process.env.SECRETA)
                console.log(usuario);

                return usuario
            } catch (error) {
                console.log("ocurrio un error");
                console.log(error);
            }
        }
    }

})
// arrancar servidos
server.listen().then(({ url }) => {
    console.log(`servidor de apollo esta en  ${url}`)
})      