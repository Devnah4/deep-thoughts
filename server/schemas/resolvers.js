const resolvers = {
    Query: { // holds a series of Methods
        helloWorld: () => { // when helloWorld is called this is returned
            return 'Hello World!';
        }
    }
};

module.exports = resolvers;