// get connection to database ORM object
const Sequelize = require("sequelize")
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize')

// read model data for table representation
const models = require('../models')

// show article by this slug
const getAuthorById = (req, res) => {
    models.Authors.findByPk(req.params.id, {
        include: [{
            model: models.Article
        }]
    })
    .then(author => {
        console.log(author)
        return res.status(200).json({ author })
    })
    .catch (error => {
        return res.status(500).send(error.message)
    })

}
module.exports = {getAuthorById}

