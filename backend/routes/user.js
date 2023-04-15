const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { user } = require('../models/models')

// GET single user by password
router.get('/:username/:password', (req, res, next) => {
  user.findOne({ username: req.params.username, password: req.params.password }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = router