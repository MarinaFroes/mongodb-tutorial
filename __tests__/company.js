const mongoose = require("mongoose")
const Company = require("../models/Company")

beforeAll(() => {
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/taxi-aggregator', {
    useNewUrlParser: true,
    useCreateIndex: true
  })
})

afterAll(done => {
  mongoose.disconnect(done)
})

describe('company tests', () => {

  test('create company', async () => {
    let company = new Company()
    company.name = 'First Company'
    company = await company.save()
  })
})