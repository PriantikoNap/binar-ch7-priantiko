const pool = require('../models/db')

const history = async(req,res) =>{
    try {
        const response = await pool.query('SELECT * FROM histories');
        res.json(response)
    } catch (err) {
        console.error(err.message);
    }
}

const historyId = async(req,res)=>{
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM histories WHERE id = $1',[id])
        // res.render('show/userhistoryshow',{data: response});
        res.json(response)
    } catch (err) {
        console.error(err.message);
    }
}
const addHistory = async(req,res) => {
    const {played, lvl} = req.body;
    try {
        const response = await pool.query('INSERT INTO histories (played, lvl) VALUES ($1,$2) RETURNING *',[parseInt(played),parseInt(lvl)])
        // res.render('success');
        res.json(response)
    } catch (err) {
        console.error(err.message);
    }
}
const updateHisotry = async(req,res) => {
    const id = req.params.id;
    const {played, lvl} = req.body;
    cons
    try {
        const response = await pool.query('UPDATE histories SET player=$1, lvl=$2 WHERE id=$1',[played,lvl,id])
        // res.render('success');
        res.json(response)
    } catch (err) {
        console.error(err.message);
    }
}
const deletehistory = async(req,res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('DELETE FROM histories WHERE id = $1',[id])
        // res.render('success');
        res.json(response)
    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    history,
    historyId,
    addHistory,
    updateHisotry,
    deletehistory
}