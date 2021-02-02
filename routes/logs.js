const express = require('express')

const router = express.Router();

const Logs = require('../models/Logs');

const Loggers = require('../models/Loggers');

//get log
router.get('/', async(req,res) => {
    try {
        const logs = await Logs.find().sort('bookTitle')
        res.json(logs)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
})
//add new log
router.post('/', 
    async(req, res) =>{
        
        const {bookTitle, isbn, publishDate, author, returned, borrowed, logger} = req.body;

        try {
            const newLogs = new Logs({
                bookTitle,
                isbn,
                publishDate,
                author,
                returned,
                borrowed,
                logger
            });

            const logs = await newLogs.save();

            res.json(logs);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});


router.put('/:id', function(req, res){
    var conditions = {_id: req.params.id};

    Logs.findByIdAndUpdate(conditions, req.body)
    .then(doc => {
        if(!doc) {return res.status(400).end();}
        return res.status(200).json(doc)
    })
    .catch(err => next(err));
});


router.delete('/:id', (req, res) =>{
    Logs.findByIdAndRemove(req.params.id).exec(),
    function(err){
        if(!err) {
            return res.send('log deleted')
        } else return res.send('log not deleted')
    }
});


module.exports = router;