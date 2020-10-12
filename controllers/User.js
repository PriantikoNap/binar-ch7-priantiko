const pool = require('../models/db')

const user = async(req,res) =>{
    try {
        const fetchAll = await pool.query('SELECT * FROM user_game')
        res.json(fetchAll)
    } catch (err) {
        console.error(err.message);
    }
}

const userId = async(req, res) => {
    const id = req.params.id
    try {
        const response = await pool.query('SELECT * FROM user_game WHERE id=$1',[id])
        res.json(response)
    } catch (err) {
        console.error(err.message);
    }
}

const updateUser = async(req, res) => {
    const id = req.params.id;
    const {username, pass} = req.body;
    try {
        const response = await pool.query('UPDATE user_game SET name = $1, email = $2 WHERE id = $3 RETURNING *',[username, pass,id])
        res.render('success');
    } catch (err) {
        console.error(err.message);
    }
}

const addUser = async(req, res) => {
    const {username, pass} = req.body;
    try {
        const response = await pool.query('INSERT INTO user_game (username, pass) VALUES($1, $2) RETURNING *',[username, pass])
        res.json(response);
    } catch (err) {
        console.error(err.message);
    }
}

const deleteUser = async(req, res) =>{
    const id = req.params.id;
    try {
        const response = await pool.query('DELETE FROM user_game WHERE id= $1 RETURNING',[id])
        res.render('success');
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    user,
    userId,
    addUser,
    updateUser,
    deleteUser
}