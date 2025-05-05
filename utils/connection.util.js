const mongoose = require('mongoose')

module.exports.connectDb = () => {
    return mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => console.log('Database connected'))
        .catch((err) => console.error('Database error', err))
}