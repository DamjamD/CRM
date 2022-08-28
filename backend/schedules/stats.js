const task = require('node-schedule')

module.exports = app => {
    const rules = new task.RecurrenceRule();
    rules.second = [1]
    //rules.minute = [2]
    task.scheduleJob(rules, async () => {
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()
        const leadsCount = await app.db('leads').count('id').first()

        
        const { Stat } = app.api.stats

       const lastStat = await Stat.findOne({}, {}, { sort: { 'createdAt': - 1 } })
     
       const stat = new Stat({
        users:  JSON.parse(usersCount['count(`id`)']),
        categories: JSON.parse(categoriesCount['count(`id`)']),
        articles: JSON.parse(articlesCount['count(`id`)']),
        leads: JSON.parse(leadsCount['count(`id`)']),
        createdAt: new Date()
         })
        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles
        const changeLeads = !lastStat || stat.leads !== lastStat.leads 
        if(changeUsers || changeArticles || changeCategories || changeLeads) {

            stat.save().then( _ => console.log('Estatisticas atualizadas!!'))
        }else{
            
        }
    })
}