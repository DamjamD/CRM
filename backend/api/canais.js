module.exports = app => {
   
    const save = (req, res) => {

    const canal = {
            id: req.body.id,
            name: req.body.name,
            parentID: req.body.parentID
        }
            app.db('canais')
            .insert(canal)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const get = (req, res) => {
            app.db('canais')
            .then(canal => res.json(canal))
            .catch(err => res.status(500).send(err))
    }
    
    return { save, get }
}