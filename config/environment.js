const environment = {

    development: {
        URL: 'http://localhost:3001/api',
        PORT: 3001
    },

    production: {
        URL: process.env.APP_URL,
        PORT: process.env.PORT
    },

    test: {
        URL: process.env.APP_URL,
        PORT: process.env.PORT
    }
}

module.exports = environment[process.env.NODE_ENV || 'development'];