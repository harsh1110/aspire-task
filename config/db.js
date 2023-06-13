const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://devpatel:devpatel2857@cluster0.4ulq4w1.mongodb.net/aspire-task?retryWrites=true&w=majority';

exports.connection = () => {
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}