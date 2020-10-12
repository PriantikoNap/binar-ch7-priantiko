const pool = require('../models/db')

const biodata = async(req,res)=>{
    try {
        const response = await pool.query('SELECT * from user_game_biodata');
        // res.render('show/userbiodatashow',{data: response});
        res.json(response)
    } catch (err) {
        console.error(err.message);
    }
}
const biodataId = async(req,res) =>{
    const id = req.params.id;
    try {
        const response = await pool.query('SELECT * FROM user_game_biodata WHERE id=$1',[id])
        // res.render('show/userbiodatashow',{data: response});
        res.json(response)
    } catch (err) {
        console.error(err.message);
    }
    
}
const addBiodata = async(req,res)=>{
    const {nama, alamat, email, wallet, country} = req.body;
    try {
        const response = await pool.query('INSERT INTO user_game_biodata (nama, alamat, email, wallet, country) VALUES($1, $2, $3, $4, $5) RETURNING *',[nama, alamat,email, parseInt(wallet),country])
        // res.render('success');
        res.json(response)
       
    } catch (err) {
     console.error(err.message);
    }
}
const updateBiodata = async(req, res) =>{
    const id = req.params.id;
    const {nama, alamat, email, wallet, country} = req.body;
    
    try {
        const response = await pool.query('UPDATE user_game_biodata SET nama = $1, alamat = $2, email = $3, wallet = $4, country = $5 WHERE id =$6 RETURNING *',[nama, alamat,email, wallet,country, id])
        // res.render('success');
        res.json(response)
    } catch (err) {
        console.error(err.message);  
    }
}

const deleteBiodata = async(req, res) => {
    const id = req.params.id;
    try {
        const response = await pool.query('DELETE FROM user_game_biodata WHERE id = $1',[id])
        // res.render('success');
        res.json(response)
    } catch (err) {
        console.error(err.message);
        
    }
}

module.exports = {
    biodata,
    biodataId,
    addBiodata,
    updateBiodata,
    deleteBiodata
}