module.exports = app => {

    const get = (req, res) => {
        app.db('funil').select()
        .then(funil => res.json(funil))
        .catch(err => res.status(500).send(err))
    }   

    return { get }
}