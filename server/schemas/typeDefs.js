// imports the graphQL tagged template functions
const { gql } = require('apollo-server-express');

// create the typeDefs
const typeDefs = gql`
type Query {
    helloWorld: String
}`;

// export the typeDefs
module.exports = typeDefs;