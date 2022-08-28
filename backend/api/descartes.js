module.exports = app => {

    const get = (req, res) => {
        app.db('crm_motivos_perdas').select()
        .then(motivos => res.json(motivos))
        .catch(err => res.status(500).send(err))
    }   

    return { get }
}