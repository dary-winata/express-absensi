const express = require('express');
const { json } = require('sequelize');
const route = express.Router();
const absensiModel = require('../models/absensis');
const usersModel = require('../models/users');
const bcrypt = require('bcrypt');
const e = require('express');
const { absenChekIn, absenCheckOut } = require('../controller/absensi');

route.get('/', async (req, res) => {
    const absensi = await absensiModel.findAll();

    res.status(200).json({
        absensi: absensi,
        metadata: "test absensi endpoint"
    }); 
})

route.post('/checkin', async (req, res) => {
    const { nip } = req.body;
    const absensis = await absensiModel.findAll();
    const result = await absenChekIn(nip, absensis);

    res.status(result.responseStatus).json({
        absen: result.absen,
        metadata: result.metadata
    })
})

route.post('/checkout', async (req, res) => {
    const { nip } = req.body;
    const result = await absenCheckOut(nip);

    res.status(result.responseStatus).json({
        absen: result.absen,
        metadata: result.metadata
    })
})

module.exports = route;