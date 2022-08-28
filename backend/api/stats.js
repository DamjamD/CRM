module.exports = app => {
    const Stat = app.dbcrm.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        leads: Number,
        createdAt: Date
    })

    const get = (req, res) => {
        Stat.findOne( {}, {}, { sort: { 'createdAt' : -1 } })
            .then(stat => {
                const defaultStat = {
                    users: 0,
                    categories: 0,
                    articles: 0,
                    leads: 0
                }
                res.json(stat || defaultStat )
            })
    }

    return { Stat, get }
}