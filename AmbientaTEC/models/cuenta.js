const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const CuentaSchema = new Schema({
  provider: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  campParticipacion:[{
    _id:  Schema.ObjectId,
    nombre:String,
    direccion:String,
    organizador:String,
    fecha:Date,
    telefono: Number,
    email: Date,
    descripcion: String,
    habilitada: Boolean,
    hashtag: String
  }],
  retosParticipacion:[{
    _id:  Schema.ObjectId,
    challengeName:String,
    points: Number,
    endDate: Date,
    time: Number,
    description: String
  }],  
  retosGanados:[{
    _id:  Schema.ObjectId,
    challengeName:String,
    points: Number,
    endDate: Date,
    time: Number,
    description: String
  }],
  retosPerdidos:{
    type: Array,
    required:false
  }
});

module.exports = Cuenta = mongoose.model('cuenta', CuentaSchema);