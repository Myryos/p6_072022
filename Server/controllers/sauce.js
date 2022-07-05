const Sauce = require('../models/sauces.js');
 /*
    req = un json avec les info + le fichier image

    effce les id pour eviter toute erreurs ou mensonge d'utilisateur

    et creer l'objets selon le model cree au prealable

    et sauvegrde le tout 
 */
// LES ROUTES POST
exports.newSauce = (req, res, next) => {
    /*if(!req.body.name || !req.body.manufacturer || !req.body.description
        || !req.body.mainPepper)
        return res.status(400).send(new Error("Bad request"))*/ // Voir si je peux terminer cette logique
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject.userId;
    const sauce = new Sauce({
                ...sauceObject,
                userId : req.auth.userId, 
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            })
    sauce.save()
        .then(() => {res.status(201).json({message: 'Sauce creer !'})}) // Verifier es code status
        .catch((error) => {res.status(400).json({ error }); console.log(error)}) //Verifier les codes d'erreur*/
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
    Sauce.find()
    .then(
        (sauces) => {
            const arraySauces = sauces.map((sauce) => {
                console.log(sauce)
                return sauce;
            })
            res.status(200).json(arraySauces);
        }
    )
    .catch(
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