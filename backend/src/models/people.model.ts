const mongoose = require('mongoose');

let People = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  gender: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  place_of_birth: { type: String },
  date_of_death: { type: Date },
  picture: { type: String },
  profession: { type: String },
  other: { type: String },
  mother: { type: Number },
  father: { type: Number },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'People' }],
  nextSibling: { type: mongoose.Schema.Types.ObjectId, ref: 'People' },
  prevSibling: { type: mongoose.Schema.Types.ObjectId, ref: 'People' },
  partner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'People' }],
  x: { type: Number },
  y: { type: Number },
  r: { type: Number },
  highlighted: { type: Boolean },
  lines: [{
    x0: { type: Number },
    y0: { type: Number },
    x1: { type: Number },
    y1: { type: Number },
    love: { type: Boolean },
    kind: { type: String },
    toNode: { type: mongoose.Schema.Types.ObjectId, ref: 'People' }
  }],
  owner: { type: String }
});



export default mongoose.model('People', People, 'people');