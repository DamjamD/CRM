module.exports = midlleware => {
    
    return (req, res, next) => {
      
        if (req.user.admin) {
            
            midlleware(req,res)
        }else{
            res.status(401).send('Usuário não é administrador!')
        }

    }


}