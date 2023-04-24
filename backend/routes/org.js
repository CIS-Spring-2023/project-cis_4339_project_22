const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { orgs } = require('../models/models')

// GET org
router.get('/', (req, res, next) => {
  orgs.findById({_id: ObjectId("6439c6736be20c13801a39a1")}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = router
