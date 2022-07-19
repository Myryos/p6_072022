
const user = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const owasp = require('owasp-password-strength-test');
const mask = require('maskdata')

//Config le modul owasp possiblement a deplace dans un fichiier specifiique

owasp.config(process.env.CONFIG)

exports.signup = (req, res) => {
    const result = owasp.test(req.body.password)
    let strong = "";
    if(!result.strong)
        strong = "Not Strong Enougth"
    if(result.strong && result.errors.length == 0)
    {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const User = new user({
                email : req.body.email,
                password: hash
            });
            User.save()
                .then(() => res.status(201).json({message: 'Utilisateur cree !'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(400).json(console.log({error})))
    }
    else
        res.status(400).json({error: result.errors + ',' + strong})
    
};

exports.login = (req, res) => {
    user.findOne({email: req.body.email})
        .then(user => {
            if (!user)
                return res.status(401).json({message : 'Paire login / mot de passe incorrecte'});
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if(!valid)
                    {
                        res.status(401).json({message : 'Paire login / mot de passe incorrecte'});
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            process.env.SECRET, //Devrais etre mis dans une variables .env
                            { expiresIn: process.env.EXPIRE}//Devrais etre mis dans une variables .env
                        )
                    })
                })
                .catch(error => res.status(400).json({error: error, email: mask.maskEmail2(req.body.email), password: mask.maskPassword(req.body.password)}));
        })
        .catch(error => res.status(400).json({error}));
};