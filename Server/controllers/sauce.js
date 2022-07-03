const Sauce = require('../models/sauces.js');
 /*
    req = un json avec les ino + le fchier image

    effce les id pour eviter toute erreurs ou mesnoonge d'utilisateur

    et creer l'objets selon le model cree au prealable

    et sauvegrde le tout 
 */
// LES ROUTES POST
exports.newSauce = (req, res) => {
    /*if(!req.body.name || !req.body.manufacturer || !req.body.description
        || !req.body.mainPepper)
        return res.status(400).send(new Error("Bad request"))*/ // Voir si je peux terminer cette logique
    const sauceObject = JSON.parse(req.body);
    delete sauceObject._id;
    delete sauceObject.userId;
    const sauce = new Sauce()
        .then({
                ...sauceObject,
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            })
        .catch(() => res.status(400).send( new Error('Impossible de creer la sauce'))); //Verifier les codes d'erreur
    sauce.save()
        .then(() => res.status(201).json({message: 'Sauce creer !'})) // Verifier es code status
        .catch(() => res.status(500).send(new Error('Impossible de sauvegarde la sauce'))) //Verifier les codes d'erreur
};

exports.likeHandle = (req,res) => {
    Sauce.findById(req.params.id)
    .then(
        // En fonction du status like changer la valeur de like et dislike.
    )
    .catch(() => {res.status(500).send(new Error('Database error'))})
}

// LES ROUTES GET

exports.getAllSauces = (req, res) => {
    Sauce.find().then(
        (sauces) => {
            const arraySauces = sauces.map((sauce) => {
                sauce.imageUrl = req.protocol + '://' +req.get('host') + '/images/' + sauce.imageUrl;
                return sauce;
            })
            res.status(200).json(arraySauces);
        }
    ).catch(
    () => {
        res.status(500).send(new Error('Database error!'));
    })
}; //Obtenir toute les sauces

exports.getOneSauce = (req, res) => {
    Sauce.findById(req.params.id).then(
        (sauce) => {
            if(!sauce)
                return res.status(404).send(new Error('Sauce not found!'));
            sauce.imageUrl = req.protocol + '://' +req.get('host') + '/images/' + sauce.imageUrl;
            res.status(200).json(sauce);
        }
    ).catch(() => {res.status(500).send(new Error('Database Error!'))})
}; //Obtenir une sauce en particulier

// LES ROUTES PUT 

exports.modifyOneSauce = (req, res) => {
    Sauce.findById(req.params.id)
    .then()
    .catch()
} // modifie une sauce

// LES ROUTES DELETE

exports.deleteOneSauce = (req, res) => {
    Sauce.findById(req.params.id)
    .then()
    .catch()
} //Suprimme une sauce

//exports.deleteSauces = (req, res) => {} //Suprimme des sauces