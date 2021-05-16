const request = require('supertest')
const api = 'http://localhost:8000'
let token;


test('It Should be Create Address for user', async () => {
    await request(api).post('/address/')
        .set('Authorization', `Bearer ${token}`)
        .send({
            country: "indonesia",
            province: "Jawa Tenggah",
            district: "Mojolaban",
            city: "Sukoharjo",
            village: "Joho",
            zip: "12343"
        })
        .expect(200)
        .then(res => {
            expect(res.body.success).toEqual(true)
        })
})

test('It Should be Get Data Address for user', async () => {
    await request(api).get('/address/')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .then(res => {
            expect(res.body.success).toEqual(true)
        })
})
test('It Should be Update Addresss data for User', async () => {
  await request(api).put('/address/update')
  .set('Authorization', `Bearer ${token}`)
  .send({
    country: "indonesia",
    province: "Jawa Tenggah",
    district: "Mojolaban",
    city: "Sukoharjo",
    village: "Joho",
    zip: "12343"
  })
  .expect(200)
  .then(res => {
      expect(res.body.success).toEqual(true)
  })
})