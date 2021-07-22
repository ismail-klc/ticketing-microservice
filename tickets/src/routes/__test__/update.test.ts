import request from "supertest";
import { app } from "../../app";
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', signin())
        .send({
            title: 'agsasda',
            price: 20
        })
        .expect(404);
});

it('returns a 401 if the user does not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'agsasda',
            price: 20
        })
        .expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
    const res = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', signin())
        .send({
            title: 'agsasda',
            price: 20
        });

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set('Cookie', signin())
        .send({
            title: 'jlksfjlkedjkla',
            price: 40
        })
        .expect(401);

});

it('returns a 400 if the user provides an invalid title or price', async () => {
    const cookie = signin();
    const res = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: 'agsasda',
            price: 20
        });

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: '',
            price: 20
        })
        .expect(400);

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'aasgsada',
            price: -20
        })
        .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
    const cookie = signin();
    const res = await request(app)
        .post(`/api/tickets`)
        .set('Cookie', cookie)
        .send({
            title: 'agsasda',
            price: 20
        });

    await request(app)
        .put(`/api/tickets/${res.body.id}`)
        .set('Cookie', cookie)
        .send({
            title: 'new title',
            price: 300
        })
        .expect(200);

    const ticketRes = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send();

    expect(ticketRes.body.title).toEqual('new title');
    expect(ticketRes.body.price).toEqual(300);
});