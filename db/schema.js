const { gql } = require('apollo-server')


// schema 
const typeDefs = gql`
    type Curso{
        titulo: String 
    }
    type Tecnologia {
        tecnologia: String
    }

    input CursoInput{
        tecnologia: String
    }

     type Query{
        ObtenerCursos(input: CursoInput!): [Curso]
        ObtenerTecnologia: [Tecnologia]
     }
`
module.exports = typeDefs