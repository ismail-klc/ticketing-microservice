import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { randomBytes } from 'crypto';


const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined");
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI must be defined");
    }

    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error("NATS_CLUSTER_ID must be defined");
    }

    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID, 
            randomBytes(4).toString('hex')
        );
        
        natsWrapper.client.on('close', () => {
            process.exit();
        });

        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        await mongoose.connect(`${process.env.MONGO_URI}/tickets`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Connected to mongodb');
    } catch (err) {
        console.error(err);
    }

    app.listen(3001, () => {
        console.log("Listening on port 3001!!!");
    });
}

start();