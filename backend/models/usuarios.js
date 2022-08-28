module.exports = app =>{

    const Usuario = app.dbcrm.model('usuarios', {
        name: String,
        idade: Number,
        email: String,
        admin: Boolean,
        ativo: Boolean

    })

    return {Usuario}

}