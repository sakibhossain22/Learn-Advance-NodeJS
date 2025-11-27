const fs = require('fs');
const appLog = fs.writeFileSync('./output/app-login.log', 'App Started')
const timeData = `\n ${new Date().getHours()} user Logged in`
fs.appendFileSync('./output/app-login.log', timeData)
