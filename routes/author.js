const express = require('express')
const router = express.Router()
const authorController = require('../controllers/author')

router.get('/:id', (req, res) => authorController.getAuthorById(req, res))

module.exports = router
