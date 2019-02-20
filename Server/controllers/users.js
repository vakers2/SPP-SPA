/* eslint-disable no-console */
const userModel = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    create: (req, res, next) => {
        userModel.create({
            username: req.body.username,
            password: req.body.password}, (err, result) => {
            if (err) {
                res.status(500).send({status: 'error', msg: 'Failed to create user. Maybe email is taken already?'})
            } else {
                res.status(200).send({status: 'success', msg: 'User created successfully'})
            }
        })
    },
    authenticate: (req, res, next) => {
        if (!req.body || !req.body.username || !req.body.password) {
            res.status(403).send({status: 'error', msg: 'No valid username/password supplied'})
        } else {
            userModel.findOne({username: req.body.username}, (err, userInfo) => {
                if (err || !userInfo) {
                    res.status(500).send({status: 'error', msg: err.message || 'User not found'})
                } else {
                    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                        const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), {expiresIn: '24h'})
                        res.status(200).send({status: 'success', msg: 'User logged in', token: token})
                    } else {
                        res.status(403).send({status: 'error', msg: 'Invalid username/password'})
                    }
                }
            })
        }
    }
}