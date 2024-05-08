// connect to database
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/joga_sequelize');

// read model data for table representation
//const Article = require('../models/article')(sequelize, Sequelize.DataTypes);
const models = require('../models')

// get all data from table
const getAllArticles = (req, res) => {
    models.Article.findAll()
        .then(articles => {
            console.log(articles)
            return res.status(200).json({ articles });
        })
        .catch(error => {
            return res.status(500).send(error.message);
        })
};

// show article by slug
const getArticleBySlug = (req, res) => {
    models.Article.findOne({
        where: {
            slug: req.params.slug
        },
        include: [
            {
                model: models.Author
            },
            {
                model: models.Tags,
                through: {
                    model: models.ArticleTag
                }
            }
        ],
    })
        .then(article => {
            console.log(article)
            return res.status(200).json({ article });
        })
        .catch(error => {
            return res.status(500).send(error.message);
        })
};

// show articles by author id
const getArticleByAuthor = (req, res) => {
    models.Article.findAll({
        where: {
            author_id: req.params.id
        },
        include: [{
            model: models.Author
        }]
    })
        .then(articles => {
            return res.status(200).json({ articles });

        })
        .catch(error => {
            return res.status(500).send(error.message);
        });
};

// export constroller functions
module.exports = {
    getAllArticles,
    getArticleBySlug,
    getArticleByAuthor
};