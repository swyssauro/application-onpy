const mongoose = require('mongoose');
const registerSchema = mongoose.Schema({
    username: String,
    userdiscriminator: Number,
    userage: Number,
    usersex: String,
    userprof: String,
    useravatar: String
});

module.exports = mongoose.model('usuários', registerSchema);