const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OwnerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  }
})

const TaxiSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required']
  },
  model: {
    type: String,
    required: [true, 'Model is required']
  },
  year: {
    type: Number,
    required: true,
    validate: {
      validator: v => /^[0-9]{4}$/.test(v),
      message: props => `${props.value} is not a valid year`
    }
  },
  owner: OwnerSchema
})

module.exports = mongoose.model('taxi', TaxiSchema)