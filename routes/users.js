const { createUser, loginUser, updateUser, deleteUser } = require('../controller/users');
const { json } = require('sequelize');
const usersModel = require('../models/users');
const express = require('express');
const route = express.Router();

route.get('/', async (req, res) => {
    const users = await usersModel.findAll();

    res.status(200).json({
        users: users,
        metadata: "test user endpoint"
    });
})

route.post('/login', async (req, res) => {
    const data = await loginUser(req.body);

    res.status(data.responseStatus).json({
        user: data.user,
        metadata: data.metadata
    })
})

route.post('/register', async (req, res) => {
    const data = await createUser(req.body)

    res.status(data.responseStatus).json({
        user: data.user,
        metadata: data.metadata
    })
})

route.delete('/', async (req, res) => {
    const { nip } = req.body;
    const data = await deleteUser(nip);

    res.status(data.responseStatus).json({
        user: data.user,
        metadata: data.metadata
    })
})

route.put('/', async (req, res) => {
    const data = await updateUser(req.body);

    res.status(data.responseStatus).json({
        user: data.user,
        metadata: data.metadata
    })
})

module.exports = route;