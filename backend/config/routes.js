const admin = require('./admin.js')
module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.post('/lead', app.api.lead.save)
    
    app.route('/leads')
        .all(app.config.passport.authenticate())
        .get(app.api.lead.get)  

    app.route('/leads/:id')   
        .all(app.config.passport.authenticate())     
        .put(app.api.lead.save)
        .get(app.api.lead.getById)    
    
    app.route('/descartes')
        .all(app.config.passport.authenticate())
        .get(app.api.descartes.get)
    
        app.route('/funil')
        .all(app.config.passport.authenticate())
        .get(app.api.funil.get)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(app.api.user.get)
        

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(app.api.user.getById)
        .delete(admin(app.api.user.remove))

    app.route('/categorias')
        .all(app.config.passport.authenticate())
        .get(app.api.categories.get)
        .post(app.api.categories.save)
        
    app.route('/canais')
        .all(app.config.passport.authenticate())
        .get(app.api.canais.get)
        .post(app.api.canais.save)
    app.route('/times')
    .all(app.config.passport.authenticate())
    .get(app.api.time.get)
    .put(app.api.time.save)

    app.route('/times/:id')
    .all(app.config.passport.authenticate())
    .get(app.api.time.get)
    .post(app.api.time.save)
    .put(app.api.time.save)
    
    app.route('/categorias/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.categories.getTree)

    app.route('/categorias/:id')
        .all(app.config.passport.authenticate())
        .delete(admin(app.api.categories.remove))
        .get(app.api.categories.getById)
        .put(admin(app.api.categories.save))
        

    app.route('/artigos')
        .all(app.config.passport.authenticate())
        .get(app.api.articles.get)

    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stats.get)

    app.route('/')
}