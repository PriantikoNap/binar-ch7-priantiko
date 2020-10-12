const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres', // your db user
    host: 'localhost',
    database: 'db2', // your db name
    password: '1', // your db password
    port: 5432,
  })

  module.exports = pool;