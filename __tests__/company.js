const mongoose = require('mongoose')
const Company = require('../models/Company')

let company

beforeAll(() => {
  // Connect to mongodb instance once before all tests run
  mongoose.Promise = global.Promise
  mongoose.connect('mongodb://localhost/taxi-aggregator', {
    useNewUrlParser: true,
    useCreateIndex: true
  })
})

beforeEach(async () => {
  // Create a company before each test
  company = new Company()
  company.name = 'First Company'
  company = await company.save()
})

afterEach(async () => {
  // Clean up database to make it work for the next tests
  await Company.deleteMany({})
})

afterAll(done => {
  // Disconnect from mongodb
  mongoose.disconnect(done)
})

describe('company tests', () => {

  test('create company', async () => {
    const count = await Company.countDocuments()
    expect(count).toBe(1)
  })

  test('read company', async () => {
    const readCompany = await Company.findById(company.id)
    expect(readCompany.name).toBe(company.name)
  })

  test('update company', async () => {
    // update existing company
    await Company.updateOne(
      { _id: company.id },
      {name: 'Name modified'}
    )

    // read company
    const readCompany = await Company.findById(company.id)
    expect(readCompany.name).toBe('Name modified')
  })

  test('delete company', async () => {
    const count = await Company.countDocuments()
    expect(count).toBe(1)

    await Company.deleteOne({ _id: company.id })

    const newCount = await Company.countDocuments()
    expect(newCount).toBe(0)
  })
})