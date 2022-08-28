module.exports = app => {

    const Lead = app.dbcrm.model('Lead', {
        name: String,
        idade: Number
    })

    const get = (req, res) => {
        Lead.findOne( {}, {}, { sort: { 'createdAt' : -1 } })
            .then(stat => {
                const defaultStat = {
                    name: 0,
                    idade: 0
                    
                }
                res.json(stat || defaultStat )
            })
           
    }

    const insert  = (req, res) => {
        const lead = {
            name: 'Marcos',
            idade: 27
        }

        Lead.create(lead)

        }


          
return  {get,insert }
} 