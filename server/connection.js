const {Client} = require('pg')

const client = new Client({
    host:'localhost',
    user:'postgres',
    port:5432,
    password:'123456',
 database:"Todo"
})

module.exports = client