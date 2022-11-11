const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db.config')

class Absensis extends Model { }

Absensis.init({
    nip: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.ENUM('in', 'out')
    }
}, {
    sequelize,
    modelName: 'Absensis'
})

module.exports = Absensis