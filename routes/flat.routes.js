const { Router } = require('express');
const Flat = require('../models/Flat');

const router = Router();

// /api/flats/record
router.post('/record', async (req, res) => {
    try {
        const {room, area, price,description} = req.body;

        const flat = new Flat({room, area, price,description});

        await flat.save();

        res.status(201).json({message: 'Квартира добавлена'});

    } catch(err) {
        res.status(500).json({message: 'Что-то пошло нет так, попробуйте снова'});
    }
});

router.get('/', async (req, res) => {
    try {
        const flats = await Flat.find(req.params); 
        res.json(flats);

    } catch(err) {
        res.status(500).json({message: 'Что-то пошло нет так, попробуйте снова'});
    }
});


module.exports = router;