module.exports = app =>{
    const { existsOrError, } = app.api.validator

    const get = (req, res) => {
        app.db('articles')
        .then( articles => res.json(articles))
        .catch(err => res.status(500).send(err))
    }

    return {get}
}