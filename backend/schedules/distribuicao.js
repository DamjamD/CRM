const task = require('node-schedule')
module.exports = app => {
    const rules = new task.RecurrenceRule();
    rules.second = [1]
    task.scheduleJob(rules, async () => {
        const lead = await app.db('leads').select('id')
    })

}