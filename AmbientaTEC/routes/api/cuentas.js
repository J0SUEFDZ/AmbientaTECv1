const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Empcuentaresa Model
const Cuenta = require('../../models/cuenta');

// Crear una cuenta de usuario
router.post('/', async (req, res) => {
    const newCuenta = new Cuenta({
        provider: req.body.provider,
        userID: req.body.userID,
        name: req.body.name,
        email: req.body.email,
        campanias:[]
    });
    console.log("Nuevo usuario: " + newCuenta);
    await newCuenta.save().then(cuenta => res.json(cuenta));
});

// Obtener un usuario por su id
router.get('/:id', async (req, res) => {
    await Cuenta.find(function(err, data) {
        if (err) return console.error(err);
        const resultado = data.find(function(element){
            return element.userID == req.params.id;
        });
        if(resultado){
            console.log("SERVER: Si existe el usuario en la BD");
            res.json(resultado);
        }
        else{
            console.log("SERVER: No existe el usuario en la BD");
            res.json(null);
        }
      });
  });

// Agregar campaña al arreglo  de identificadores de campañas
router.put('/addCampania/:userID', async (req, res) => {
    if( req.body.campania != null ){
        await Cuenta.updateOne( { userID: req.params.userID }, { $push: { campanias: { $each: [ req.body.campania ] }, } } );
        res.json({ status: 'Campaña agregada de lista' });
    }    
    res.json('Campo campania no contemplado en el json');
});

// Eliminar campaña al arreglo de identificadores de campañas
router.put('/deleteCampania/:userID', async (req, res) => {
    if( req.body.campania != null){
        await Cuenta.updateOne( { userID: req.params.userID }, { $pull: { campanias: { $in: [ req.body.campania ] } } }, { multi: true } );    
        res.json({ status: 'Campaña eliminada de lista' });
    }
    res.json('Campo campania no contemplado en el json');
});

module.exports = router;