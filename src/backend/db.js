const mongoose = require('mongoose');

const mongoUri = "mongodb+srv://abulaalafarehskipq:0900@cluster0.gkjduie.mongodb.net/?retryWrites=true&w=majority";

const connectToMongo = () =>{
    mongoose.connect(mongoUri);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('connected to mongo successfully');
    });
}

module.exports = connectToMongo;
