import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }

    try{
        await mongoose.connect('mongodb://localhost:27017/tickets', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }, () => {
        console.log('Connected to mongodb');
        app.listen(3001, () => {
            console.log("Listening on port 3001!!!");
        });
    }) 
    } catch(err){
        console.error(err);
    }
}

start();