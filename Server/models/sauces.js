const mongoose = require('mongoose');

const SaucesSchema = mongoose.Schema({
    userId: {type: String, required : true},
    name: {type: String, required : true},
    manufacturer:{type: String, required : true},
    description:{type: String, required : true},
    mainPepper:{type: String, required : true},
    imageUrl:{type: String, required : true},
    heat:{type: Number, required : true, min: 1, max: 10},
    likes:{type: Number},
    dislikes:{type: Number},
    usersLiked:{type: Array},//<userId>
    usersDisliked:{type: Array}//<userId>
});


module.exports = mongoose.model('Sauces', SaucesSchema);