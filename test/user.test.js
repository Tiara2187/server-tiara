const request = require('supertest')
const api = 'http://localhost:8000'
let token;

const user = {
    email: 'testUser@gmail.com',
    password: '12345678',
    username: 'testUser',
    phone: '081370902208'
}
test('It Should sign up for a user', async () => {
    await request(api).post('/users/signup')
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
test('It Should Login for User', async () => {
    await request(api).post('/users/signin')
        .send({
           email: user.email,
            password: user.password
        })
        .expect(200)
        .then((res) => {
            token = res.body.token;
            expect(res.body.success).toEqual(true)
        })
})

test('It Should get data user', async () => {
    await request(api).get('/users/')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(res => {
            expect(res.body.success).toEqual(true)
        })
})

test('It Should be forget password and change new password for User', async () => {
    await request(api).put('/users/forgetpass')
    .send({
        email: user.email,
        phone: user.phone,
        password: user.password
    })
    .expect(200)
    .then(res => {
        expect(res.body.success).toEqual(true)
    })
})

test('It Should be Update Data User', async () => {
    await request(api).put('/users/updateuser')
    .set('Authorization', `Bearer ${token}`)
    .send({
        username: "tiaramuttianingtyas23",
        firstname: "tiara",
        lastname: "muttianing tyas",
        password: "tiara23",
        birthdate: "23-03-1998",
        address: "Gondang Sawah RT 02 / RW 07 Joho, Mojolaban, Sukoharjo"

    })
    .expect(200)
    .then(res => {
        expect(res.body.success).toEqual(true)
    })
})
