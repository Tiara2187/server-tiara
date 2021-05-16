const request = require('supertest')
const api = 'http://localhost:8000'
let token;
let productId;


test('It Should be get List Product',async () => {
    await request(api).get('/product/product-item')
  .expect(200)
  .then((res) => {
      expect(res.body.success).toEqual(true)
  })
})


test('It Should be Get Detail Product',async () => {
  await request(api).get(`/product/product-detail/${productId}`)
  .expect(200)
  .then((res) => {
      expect(res.body.success).toEqual(true)
  })
})
