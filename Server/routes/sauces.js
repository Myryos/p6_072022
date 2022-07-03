const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth.js');
const multer = require('../middleware/multer-config.js')

const sauceCtrl = require('../controllers/sauce.js');

router.post('/', auth, multer, sauceCtrl.newSauce) //registre toute la sauce
router.post('/:id/like', auth, ) // Gere les like et ou dislike;

router.get('/', auth, ); // retourne toute les sauces
router.get('/:id', auth, ) //retourne une sauce en particulier

router.put('/:id', auth, multer, ) //modifie la sauce

router.delete('/:id', auth, ) //supprime la sauce

module.exports = router;