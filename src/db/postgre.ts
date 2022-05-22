const Pool = require('pg').Pool

const pool : any = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'doodleMe',
  password: '0000',
  port: 5432,
})

const getUsers = (req : any, res : any) => {
  pool.query('SELECT * FROM data.users ORDER BY id ASC', (error: any, results: { rows: any }) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers
}