const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');// //Devrais etre mis dans une variables .env
        const userId = decodeToken.userId;
        req.auth = {
            userId:  userId
        };
        next();
    } 
    catch(error)
    {
        res.status(403).json({error});
    }
}