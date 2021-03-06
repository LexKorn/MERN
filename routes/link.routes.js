const {Router} = require('express');
const config = require('config');
const shortid = require('shortid');
const Link =require('../models/Link');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl');
        const {from} = req.body;
        const code = shortid.generate();
        const existing = await Link.findOne({ from });  // проверка, есть ли в базе уже такая ссылка 'from'

        if (existing) {             // если такая ссылка в базе есть, значит все данные по ней уже сформированы, и не надо их заного формировать
            return res.json({ link: existing });
        }

        const to = baseUrl + '/t/' + code;

        const link = new Link({
            code, to, from, owner: req.user.userId
        })

        await link.save();

        res.status(201).json({ link });

    } catch(err) {
        res.status(500).json({message: 'Что-то пошло нет так, попробуйте снова'});
    }
});

router.get('/', auth, async (req, res) => {     // auth - middleware для определения - авторизован user или нет . Теперь данный endpoint защищён
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json(links);
    } catch(err) {
        res.status(500).json({message: 'Что-то пошло нет так, попробуйте снова'});
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id); 
        res.json(link);
    } catch(err) {
        res.status(500).json({message: 'Что-то пошло нет так, попробуйте снова'});
    }
});


module.exports = router;