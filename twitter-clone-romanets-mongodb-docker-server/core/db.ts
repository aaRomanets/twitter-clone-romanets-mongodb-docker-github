import mongoose from "mongoose";

import dotenv from 'dotenv';
dotenv.config();

mongoose.Promise = Promise;

const database = process.env.MONGODB_URI != undefined ? process.env.MONGODB_URI : "mongodb://127.0.0.1:27017/test";
mongoose.connect(database, {useNewUrlParser: true})
.then(() => {
    return console.info(`Successfully connected to ${database}`)
})
.catch(err => {
    console.error(`Error connecting to database :`, err);

    return process.exit(1);
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export {db , mongoose};