module.exports = app =>{

    const Usuario = app.dbcrm.model('usuarios', {
        name: String,
        idade: Number,
        email: String ,
        admin: Boolean,
        enable: Boolean,
        contatos: []

    })
    const get = (req, res) => {
        Usuario.find().then(user => {
            res.json(user)
        }).catch(err => res.status(500).send(err))
    }

    const  save =  (req, res) => {
       
           Usuario.create(req.body)
            .then(usuario => {
                res.json(usuario)
            } ).catch(err => res.status(500).send(err))
      
    }
return {save, get, Usuario}
}