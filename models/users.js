const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db.config')

class Users extends Model { }

Users.init({
    nip: {
        type: DataTypes.INTEGER,
        unique: true
    },
    nama: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('in', 'out')
    }
}, {
    sequelize,
    modelName: 'Users'
})

module.exports = Users