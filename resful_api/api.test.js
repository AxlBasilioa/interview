const request = require('supertest');
const app = require('./index');

//API TEST
describe('API Endpoints', ()=>{
    // GET TEST
    it('GET /form - success', async()=>{
        //request response for GET method
        const response = await request(app).get('/form')
        .expect('Content-Type', /json/)
        .expect(200);
        // expected Array body Response
    expect(response.body).toBeInstanceOf(Array);
    });
    // POST TEST
    it('POST /form - success',async () =>{
        const response = await request(app).post('/form')
        .send({mail:'test@test.com', body:'Lorem ipsummmmm'})
        .expect(200);
        expect(response.body.Success);
    });
    //PUT TEST
    it('PUT /form - success', async()=>{
        const response = await request(app).put('/form/2')
        .send({mail:"put@test.com", body:"lorem put test ipsum"})
        .expect(200);
        expect(response.body.Success);
    });
    //DELETE TEST
    it('DELETE /form - success', async()=>{
        const response = await request(app).delete('/form/3')
        .expect('Content-Type', /json/)
        .expect(200);
        expect(response.body.Success);
    })
});