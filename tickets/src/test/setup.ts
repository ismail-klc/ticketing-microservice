import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
    function signin(): string[];
}

jest.mock('../nats-wrapper.ts');


let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = "asdasdfasd";
    process.env.NODE_ENV = "test";

    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {
    // build a jwt payload
    const payload = {
        id: mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }

    // create the jwt
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // build session object
    const session = {
        jwt: token
    }

    // turn that session into json
    const sessionJSON = JSON.stringify(session);

    // take json and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats cookie with the encoded data
    return [`express:sess=${base64}`];
};