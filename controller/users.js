const { passwordCheck } = require('../utils/user_utils');
const usersModel = require('../models/users');
const bcrypt = require('bcrypt');
const { where } = require('sequelize');

const createUser = async (bodyParam) => {
    const { nip, nama, password, status } = bodyParam;

    const checkUser = await usersModel.findOne({ where: { nip: nip } });
    if(checkUser == null) {
        const encryptedPassword = await bcrypt.hash(password?password:"", 10)
        const users = await usersModel.create({
            nip : nip? nip : 0,
            nama : nama? nama : "",
            password : encryptedPassword,
            status : status? status : "out"
        });
        return { responseStatus: 200, user: users, metadata: "user already added" };
    } else
        return {responseStatus: 400, user: null, metadata: "cannot add user, user already exist"};
}

const loginUser = async (bodyParam) => {
    const { nip, password } = bodyParam;

    const credentialEncrypt = await passwordCheck(nip, password);
    
    if(credentialEncrypt.compare)
        return { responseStatus: 200, user: credentialEncrypt.user, metadata: "Login Success" };
    else
        return { responseStatus: 400, user: null, metadata: "Login Failed, wrong credentials" };
}

const updateUser = async (bodyParam) => {
    const { nip, nama, password, passwordNew } = bodyParam;

    const credentialEncrypt = await passwordCheck(nip, password);

    if(credentialEncrypt.compare) {
        const newPassowrd = await bcrypt.hash(passwordNew, 10)
        const users = await usersModel.update({
            nama : nama,
            password : newPassowrd
        }, { where: { nip: nip }});
        return { responseStatus: 200, user: users, metadata: "User already updated" }
    } else {
        return { responseStatus: 400, user: null, metadata: "Wrong credential" }
    }
}

const deleteUser = async (nip) => {
    const users = await usersModel.destroy({
        where: {
            nip: nip
        }
    });
    if (users != 0)
        return { responseStatus: 200, user: users, metadata: "User already deleted" }
    else
        return { responseStatus: 400, user: null, metadata: "User not found" }
}

const editAbsenUser = async (user, status) => {
    const _ = await usersModel.update({
        nip: user.nip,
        nama: user.nama,
        password: user.password,
        status: status
    }, {where: { nip: user.nip }});
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    editAbsenUser
}