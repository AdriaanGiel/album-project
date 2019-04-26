const mongoose = require('mongoose');

module.exports = {
    /**
     * Method to start mongo connection with mongoose
     * @param uri
     * @returns {Promise}
     */
    startMongo(uri) {
        return mongoose.connect(uri,{ useNewUrlParser: true })
            .then(db => {
                return db;
            }).catch(err => {
            console.log("database error", err);
        });
    }
};