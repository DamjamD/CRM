module.exports = app => {
    
    const Time = app.dbcrm.model('Time', {
        name: String,
        users: [],
        enable: Boolean
        })
    

    const get = (req, res) => {
       Time.find({}).then(time => {
        res.json(time)
       })

    }

    const save = async (req, res) => {
    
        if (req.params.id == null){
    
        time = new Time({
            name: req.body.name,
            users: req.body.users,
            enable: req.body.enable
        })
        time.save()
        .then(time => res.json(time).status(200))
        .catch(err => res.status(500).send(err))
    }else{
        const filter =  {_id: req.params.id} 
        const update = { users: req.body.users}
        time = await Time.findOneAndUpdate(filter,update).then(a => res.json(a)).catch(err => res.status(500).send(err))
       

        
    }
}

   return  {save, get}
}