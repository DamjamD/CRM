module.exports  = app => {
const { existsOrError, notExistsOrError, equalsOrError } = app.api.validator


const save = (req, res) => {
    const lead = {          
                     name: req.body.Nome,
                     email: req.body.Email,
                     fone: req.body.Telefone,
                     date: req.body.Date,
                     time: req.body.Time,
                     url: req.body['Page URL'],
                     form_id: req.body.form_id ,
                     observacao: req.body.observacao     
    }



    if(req.params.id) 
    {
      
        lead.id = req.params.id
        lead.status = req.body.status
       
        lead.cod_descarte = req.body.cod_descarte
        lead.cod_andamento = req.body.cod_andamento
        lead.cod_curso = req.body.cod_curso
        lead.cod_responsavel = req.body.cod_responsavel
        
        delete lead.email;
    }
    
    const timeElapsed = Date.now()
    const today = new Date(timeElapsed)
    if(lead.status == 'D'){
          
    try {
        existsOrError(lead.cod_descarte, 'Motivo de Descarte não selecionado')  
        existsOrError(lead.cod_responsavel, 'Não pode descartar lead sem responsável')      
        lead.data_encerrada = today
    } catch(msg) {
        return res.status(400).send(msg)
    }
   
    }
    if (lead.status == 'P'){
    try {
        existsOrError(lead.cod_andamento, 'Selecione uma situação para o evento')  
        existsOrError(lead.cod_curso, 'Selecione um curso de interesse')   
        
        lead.data_encerrada = today
    } catch(msg) {
        return res.status(400).send(msg)
    }
   
    }
    if (lead.status == 'E'){
        try {
            existsOrError(lead.cod_responsavel, 'Selecione um responsável')      
            lead.data_encerrada = today
        } catch(msg) {
            return res.status(400).send(msg)
        }
       
        }
        console.log('Laead que Chegou para atualizar')
  
    
    if (lead.id) {

       console.log('Ultimo antes do Update')
        lead.ultima_atualizacao = today
        app.db('leads')
                .update(lead)
                .where({ id: req.params.id})            
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
    }
    else {
   
       app.db('leads').insert(lead)
            .then( result => res.status(204).send(result))
            .catch(err => res.status(500).send(err)) 
    
    }          
   
}

const limit = 10
const get = async (req, res) => {
        const filter = {}
        filter.status = 'P'
        if(req.query.page){
         filter.page =  req.query.page
        }
        if(req.query.user){
            filter.cod_responsavel =  req.query.user
        }
      console.log(filter)
                const page = req.query.page || 1
                

                const result = await app.db('leads').count('id').first().where({status: filter.status, cod_responsavel: filter.cod_responsavel })
                const count = JSON.parse(result['count(`id`)'])  // parseInt(result.count)
                
                app.db('leads')
                .select('id','name','Datecreated','ultima_atualizacao','fone','email')                
                .where({status :'P',cod_responsavel: filter.cod_responsavel})
                .limit(limit).offset(page * limit - limit)
                .then(leads => {
                   
                    res.json({data: leads, count, limit})
                
                })
                .catch(err => res.status (500).send(err))
    }

const getById = (req, res) => {
  
        app.db('leads')
        .where({id: req.params.id}) 
        .first()    
        .then(lead => {
            if (lead.observacao === null ){
                lead.observacao = ''
            }
            lead.observacao = lead.observacao.toString() 
            res.json(lead).status(200)
          
        })
        .catch(err => res.status (500).send(err))
}
return  {save, get, getById}
}