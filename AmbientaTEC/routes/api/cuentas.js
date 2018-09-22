const express = require('express');
const router = express.Router();

// Empcuentaresa Model
const Cuenta = require('../../models/cuenta');


// @route   POST api/participantes
// @desc    Create a participantes
// @access  Public
router.post('/', async (req, res) => {
    const newCuenta = new Cuenta({
        provider: req.body.provider,
        userID: req.body.userID,
        name: req.body.name,
        email: req.body.email,
    });
    console.log("Nuevo usuario: "+newCuenta);

    await newCuenta.save().then(cuenta => res.json(cuenta));
});

router.get('/:id', async (req, res) => {
    await Cuenta.find(function(err, data) {
        if (err) return console.error(err);
        const resultado = data.find(function(element){
            return element.userID==req.params.id;
        });
        if(resultado){
            console.log("SERVER:Si existe el usuario en la BD");
            res.json(resultado);
        }
        else{
            console.log("SERVER: No existe el usuario en la BD");
            res.json(null);
        }
      });
  });
  


module.exports = router;