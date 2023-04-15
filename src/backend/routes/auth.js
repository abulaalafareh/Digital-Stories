const mongoose =  require('mongoose');
const express = require('express')
const router = express.Router()
const User = require('../models/Users')   
const { Schema } = mongoose;

// Create a User using : POST "/auth/" dosent require authentication
router.post('/', (req, res)=>{
    console.log(req.body)
    const user = User(req.body)
    user.save()
    res.send(req.body)
})

module.exports = router