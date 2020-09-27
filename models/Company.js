const mongoose = require('mongoose')
const Taxi = require('./Taxi')
const Schema = mongoose.Schema

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  taxis: [{
    type: Schema.Types.ObjectId,
    ref: 'taxi'
  }]
  /** If we wanted to have a subdocument 
   * instead of a reference
  taxis: [TaxiSchema]
   */
})

// post save middleware
CompanySchema.post('save', doc => {
  // throw error if name equals 'throws error name'
  if (doc.name === 'throw error name') {
    throw new Error('New Test Error')
  }
})

// pre save middleware
CompanySchema.pre('save', function (next) {
  // sanitize name before saving
  this.name = this.name.replace(/[^a-zA-Z0-9 ]/g, '')
  next()
})

// pre remove middleware
CompanySchema.pre('remove', async function (next) {
  // delete company's taxis before removing company
  await Taxi.deleteMany({ _id: { $in: this.taxis } })
  next()
})

module.exports = mongoose.model('company', CompanySchema)