// connects to the jsonwebtoken library
const jwt = require('jsonwebtoken');

// secret helps establish that the key is valid
const secret = 'itsasecretduh';
// This is how long the token will be valid for
const expiration = '2h';

module.exports = {
    // generates a token using the username, email and id
    signToken: function({ username, email, _id }) {
        const payload = { username, email, _id };

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    // verifies the token and returns the payload
    authMiddleware: function({ req }) {
        // allows the token to be sent via req.body, req,query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // separate "Bearer" from "<tokenvalue>"
        if (req.headers.authorization) {
            token = token
            .split(' ')
            .pop()
            .trim();
        }

        // if the token is valid, return the payload
        if (!token) {
            return req;
        }

        try {
            // decode and attach user data to request object
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        // return updated request object
        return req;
    }
};