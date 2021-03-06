const pool = require('../models/db')

exports.getGames = async (req, res) =>{
    const response = await pool.query('SELECT * FROM room')
    res.status(200).json(
        { status: 200, data: response.rows, message: "Games found." }
)
}
exports.createRoom = async( req, res)=>{
    const {roomname} = req.body;
    
    const response = await pool.query('INSERT INTO room (roomname) values($1) RETURNING *',[roomname])
    res.status(200).json({
        status:200, data: response.rows, message:"room created"
    })
}
exports.fightRoom = async(req, res)=>{
    const id = req.params.id;
    var accessToken = await req.headers.authorization.split(" ");
    const room = await pool.query('SELECT * FROM room WHERE id=$1',[id]);
    const user = await pool.query('SELECT username FROM users WHERE token=$1',[accessToken[1]]);
    console.log(user.rows[0]["username"]);
    if(room.rows[0]["playerone"] == null && room.rows[0]["playertwo"]== null){
        if(room.rows[0]["playerone"] == null){
            const playerOne = await pool.query('UPDATE room SET playerone = $1 WHERE id=$2 ',[room.rows[0]["playerone"], id])
        }
        
    }
    
}