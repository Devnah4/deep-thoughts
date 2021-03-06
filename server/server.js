const express = require('express');
// imports in the Apollo server
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// imports typeDef and resolvers
const { typeDefs, resolvers } = require('./schemas');
// exports the server here
const db = require('./config/connection');
// imports authentication utility
const { authMiddleware } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
// creates a new Apollo server and passes in our data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Provides static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Creates a new instance of the ApolloServer with the graphQL schema info
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrates Apollo with Express as a middleware component
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // logs where we test GQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);