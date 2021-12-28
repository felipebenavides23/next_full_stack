const { ApolloServer } = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/Resolver')
// server 
const server = new ApolloServer({
    typeDefs, resolvers

})
// arrancar servidos
server.listen().then(({ url }) => {
    console.log(`servidor de apollo esta en  ${url}`)
})      