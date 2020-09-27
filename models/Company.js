const mongoose = require('mongoose')
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

module.exports = mongoose.model('company', CompanySchema)