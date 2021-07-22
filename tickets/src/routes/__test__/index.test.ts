import request from "supertest";
import { app } from "../../app";

const createTicket = async (title: string, price: number) => {
    return await request(app)
        .post('/api/tickets')
        .set('Cookie', signin())
        .send({
            title,
            price
        });
}

it('can fetch a list of tickets', async () => {
    await createTicket('gadsafsad', 20);
    await createTicket('gadsabsed', 40);
    await createTicket('nhjtafsad', 30);

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);
    
    expect(response.body.length).toEqual(3);
});