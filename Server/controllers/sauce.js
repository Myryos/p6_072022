const Sauce = require('../models/sauces.js');

const fs = require('fs');
 /*
    req = un json avec les info + le fichier image

    effce les id pour eviter toute erreurs ou mensonge d'utilisateur

    et creer l'objets selon le model cree au prealable

    et sauvegrde le tout 
 */
// LES ROUTES POST
exports.newSauce = (req, res) => {
    /*if(!req.body.name || !req.body.manufacturer || !req.body.description
        || !req.body.mainPepper || !req.body.sauce)
        return (error) => res.status(400).json({error: error}) // Voir si je peux terminer cette logique*/
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject.userId;
    const sauce = new Sauce({
                ...sauceObject,
                likes : 0,
                dislikes: 0,
                userId : req.auth.userId, 
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            })
    sauce.save()
        .then(() => {res.status(201).json({message: 'Sauce creer !'})}) // Verifier es code status
        .catch((error) => {res.status(400).json({ error }); console.log(error)}) //Verifier les codes d'erreur*/
};

/*
    Cette fonction recupere un objet via son id, puis increment ou decremente les likes/dislikes ainsi que les arrays qui contiennent
    
    les users qui ont like ou dislike.

    Puis sauvegarde l'objet.

*/ 
exports.likeHandle = (req,res) => {
    Sauce.findById(req.params.id)
    .then((sauce) =>
        {
            if(req.body.like == 1){
                if(sauce.usersLiked.indexOf(req.body.userId) != -1) //Si Il est deja present dans l'array
                {
                    sauce.usersLiked.slice(sauce.usersLiked.indexOf(req.body.userId), 1)
                    sauce.likes--;
                }
                else //On doit insere l'id dans l'array
                {
                    sauce.usersLiked.push(req.body.userId)
                    sauce.likes++;
                }
            }
            if(req.body.like == -1)
            {
                if(sauce.usersDisliked.indexOf(req.body.userId) != -1){
                    //Alors tu efface
                    sauce.usersDisliked.slice(sauce.usersLiked.indexOf(req.body.userId), 1)
                    sauce.likes--;
                }
                else 
                {
                    sauce.usersDisliked.push(req.body.userId)
                    sauce.dislikes++;
                    //tu le rajoute dans dislikes
                }
            }
            sauce.save()
            res.status(200).json({likes : sauce.likes, dislikes:sauce.dislikes})
        },
        // En fonction du status like changer la valeur de like et dislike.
    )
    .catch((error) => {res.status(500).json({error})})
}

// LES ROUTES GET

/*
    Cette fonctions revoois la totalite des objets de la base de donne du model etablis (ici Sauce)
*/ 

exports.getAllSauces = (req, res) => {
    Sauce.find()
    .then(
        (sauces) => {
            const arraySauces = sauces.map((sauce) => {
                return sauce;
            })
            res.status(200).json(arraySauces);
        }
    )
    .catch(
        () => {
            res.status(500).send(new Error('Database error!'));
        })
}

/*
    Cett fonction renvois un bojets en particulier trouve par son id

*/ 

exports.getOneSauce = (req, res) => {
    Sauce.findById(req.params.id).then(
        (sauce) => {
            if(!sauce)
                return res.status(404).send(new Error('Sauce not found!'));
            res.status(200).json(sauce);
        }
    ).catch(() => {res.status(500).send(new Error('Database Error!'))})
}

// LES ROUTES PUT 

/*
    Trouve une sauce via son id et modifie les informatio envoye via req grace a updateOne
*/ 

exports.modifyOneSauce = (req, res) => {
    Sauce.updateOne({_id : req.params.id}, {...req.body, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Sauce modifier'}))
    .catch((error) => {res.status(400).json({error})})
}

// LES ROUTES DELETE

/*
    Efface une sauce via son id ainsi que le fichier image lier a cet objets

*/ 

exports.deleteOneSauce = (req, res) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        if(sauce.userId != req.auth.userId)
            res.status(400).json({message: "Not Authorized"});
        else
        {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                .then(() => {res.status(200).json({message: 'Sauce Supprime'})})
                .catch((error) => {res.status(401).json({error})})
            })
        }
    })
    .catch(error => {res.status(500).json({error})});
    
}

//exports.deleteSauces = (req, res) => {} //Suprimme des sauces