import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/listeners/ticket-created-listener';
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener';


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

        new TicketCreatedListener(natsWrapper.client).listen();
        new TicketUpdatedListener(natsWrapper.client).listen();

        await mongoose.connect(`${process.env.MONGO_URI}/orders`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Connected to mongodb');
    } catch (err) {
        console.error(err);
    }

    app.listen(3002, () => {
        console.log("Listening on port 3002!!!");
    });
}

start();