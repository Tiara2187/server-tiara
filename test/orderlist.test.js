const request = require('supertest')
const api = 'http://localhost:8000'
let token;
let cartId;

test('It Should be Get Data Orderlist for user', async () => {
    await request(api).get('/users/orderlist/')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(res => {
            expect(res.body.success).toEqual(true)
        })
})