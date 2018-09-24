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
  retosGanados:{
    type: Array,
    required: false
  },
  retosPerdidos:{
    type: Array,
    required:false
  }
});

module.exports = Cuenta = mongoose.model('cuenta', CuentaSchema);