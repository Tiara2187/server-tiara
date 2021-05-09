const request = require('supertest')
const api = 'http://localhost:6000'

const user = {
    email: 'tiaramuttianingtyas23@gmail.com',
    password: 'tiara2398',
    username: 'tiara23',
    phone: '081390702208'
}
test('It Should sign up for a user', async () => {
    await request(api).post('/users/signup/')
        .send({
            email: user.email,
            password: user.password,
            username: user.username,
            phone: user.phone
        })
        .expect(201)
        .then((res) => {
            expect(res.body.success).toEqual(true)
        })
})

