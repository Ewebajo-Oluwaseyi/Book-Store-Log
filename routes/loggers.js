const express = require('express')

const router = express.Router();

const Loggers = require('../models/Loggers');

const {check, validationResult} = require('express-validator/check')

//get logger
router.get('/', async(req,res) => {
    try {
        const loggers = await Loggers.find().sort('firstName')
        res.json(loggers)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
})

//add new logger
router.post('/', [
    check('firstName', 'Please include a first name').not().isEmpty(),
    check('lastName', 'Please include a second name').not().isEmpty()
], 
    async(req, res) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        const {firstName, lastName} = req.body;

        try {
            const newLoggers = new Loggers({
                firstName,
                lastName
            });

            const loggers = await newLoggers.save();

            res.json(loggers);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});


router.put('/:id', (req, res) =>{
    res.send('Update loggers')
});


router.delete('/:id', (req, res) =>{
    Loggers.findByIdAndRemove(req.params.id).exec(),
    function(err){
        if(!err) {
            return res.send('logger deleted')
        } else return res.send('logger not deleted')
    }
});


module.exports = router;