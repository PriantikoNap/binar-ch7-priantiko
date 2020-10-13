const pool = require('../models/db')
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.login = async(req, res)=>{
    const {username, pass} = req.body;
    try {
        const user = await pool.query('SELECT * FROM users WHERE username=$1',[req.body.username])
        // res.json(user.rows[0]['pass']);
        if(user){
            const isPasswordCorrect = await bcrypt.compare(pass, user.rows[0]['pass'])
            if(isPasswordCorrect){
                const accessToken = await crypto.randomBytes(24).toString('hex');
                const tokenacc = await pool.query('UPDATE users SET token=$1 where username=$2',[accessToken,user.rows[0]['username']]);
                res.status(200).json({
                    message : 'berhasil login',
                    token : accessToken,
                    data : tokenacc
                })
            }else{
                res.status(500).json({
                    message:"unauthorize"
                })
            }
        }else{
            res.status(500).json({
                message:"user not found !"
            })
        }
    } catch (err) {
        res.status.json({
            message : err.message
        })
    }

}

exports.register = async (req, res)=>{
    const {username, pass} = req.body;
    const echpass =  await bcrypt.hash(pass, 12)
    // console.log(username, echpass);
    
    try {
        if (!req.body.username || !req.body.pass) {
            res.status(400).json({message: "bad request. missing parameters"});
          }else{
            const permisioning = await pool.query('SELECT EXISTS(SELECT username FROM users WHERE username=$1)',[username]);
            if (permisioning.rows[0]['exists']) {
                res.status(400).json({message: "Username Has Been Taken"});
            } else {
                const response = await pool.query('INSERT INTO users (username, pass, role, token) VALUES($1, $2,$3,$4) RETURNING *',[username, echpass,'user','']);
                // res.json(response);
                res.render('successregis',{data:response.rows})
            }
          }
          
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

// exports.register = async (req, res)=>{
//     const {username, pass} = req.body;
//     const echpass =  await bcrypt.hash(pass, 12)
//     // console.log(username, echpass);
    
//     try {
//         if (!req.body.username || !req.body.pass) {
//             res.status(400).json({message: "bad request. missing parameters"});
//           }else{
//             const permisioning = await pool.query('SELECT EXISTS(SELECT username FROM users WHERE username=$1)',[username]);
//             if (permisioning.rows[0]['exists']) {
//                 res.status(400).json({message: "Username Has Been Taken"});
//             } else {
//                 const response = await pool.query('INSERT INTO users (username, pass, role, token) VALUES($1, $2,$3,$4) RETURNING *',[username, echpass,'user','']);
//                 res.json(response);
//             }
//           }
          
//     } catch (err) {
//         res.status(500).json({message: err.message})
//     }
// }
exports.adminregister = async( req, res) => {
    const {username, pass} = req.body;
    const echpass =  await bcrypt.hash(pass, 12)
    // console.log(username, echpass);
    
    try {
        if (!req.body.username || !req.body.pass) {
            res.status(400).json({message: "bad request. missing parameters"});
          }else{
            const permisioning = await pool.query('SELECT EXISTS(SELECT username FROM users WHERE username=$1)',[username]);
            if (permisioning.rows[0]['exists']) {
                res.status(400).json({message: "Username Has Been Taken"});
            } else {
                const response = await pool.query('INSERT INTO users (username, pass, role, token) VALUES($1, $2,$3,$4) RETURNING *',[username, echpass,'admin','']);
                res.render('successregis',{data:response.rows[0]['username']})

            }
          }
          
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}