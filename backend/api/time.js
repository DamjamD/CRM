module.exports = app => {
    
    
    getUsuario = async () =>{
        const {Usuario}  = app.models.usuarios //app.dbcrm.usuarios.find();

         Usuario.find().then(user => {
           return user
         })    

    }

 
    const get = (req, res) => {
        Time.find().then(user => {
            res.json(user)
        }).catch(err => res.status(500).send(err))
    }

   return  get
}