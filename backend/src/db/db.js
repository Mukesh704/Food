const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection;

db.on('connected', () => {
    console.log('DB Connected')
})

db.on('disconnected', () => {
    console.log('DB Disconnected')
})

db.on('error', (err) => {
    console.log(`DB error: ${err}`);
})

module.exports = db;