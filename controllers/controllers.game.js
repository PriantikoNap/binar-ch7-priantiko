const pool = require('../models/db')

exports.getGames = async (req, res) =>{
    const response = await pool.query('SELECT * FROM room')
    res.status(200).json(
        { status: 200, data: response.rows, message: "Games found." }
)
}