const request = require('supertest')
const api = 'http://localhost:8000'
let token;
let productId;


  test('It Should be Add Cart for user', async () => {
    await request(api).post('/users/cart/')
        .set('Authorization', `Bearer ${token}`)
        .send({
            productId: "60963423d0cfd1287817b9bc",
        })
        .expect(200)
        .then(res => {
            expect(res.body.success).toEqual(true)
        })
})

test('It Should be delete Cart',async () => {
    await request(api).delete(`/users/cart/${productId}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .then((res) => {
        expect(res.body.success).toEqual(true)
    })
})