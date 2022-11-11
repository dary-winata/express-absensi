const bycript = require('bcrypt');
const UserModel = require('../models/users');

const passwordCheck = async (nip, password) => {
    const user = await UserModel.findOne({where: {nip: nip}});
    const compare = await bycript.compare(password, user.password);
    console.log(compare);
    return { compare: compare, user: user };
}

module.exports = {
    passwordCheck
}