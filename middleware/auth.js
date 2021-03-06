
var express = require('express')

var pool = require('../models/db');

const ROLES = ['user', 'admin'];


  
  async function roleCheck(req, res, next) {
    try {
      var accessToken = await req.headers.authorization.split(" ");
    //   const user = await db.User.findOne({
    //     where: { token: accessToken[1]}
    //   })
    const user = await pool.query("SELECT * FROM users WHERE token=$1",[accessToken[1]])
      // user not found
      if (!user.rows[0]) {
        res.status(401).json({
          message : "401 unauthorized"
        })
      }
      // role is invalid 
      if (!ROLES.includes(user.rows[0]['role'])) {
        res.status(401).json({
          message : "401 Invalid Role"
        })
      }
      next()
    } catch (error) {
      res.status(500).json({
        message : error.message
      })  
    }
  }
  
  async function adminCheck(req, res, next) {
    try {
      var accessToken = await req.headers.authorization.split(" ");
      const user = await pool.query("SELECT * FROM users WHERE token=$1",[accessToken[1]])
      // user not found
      if (!user) {
        res.status(401).json({
          message : "401 unauthorized"
        })
      }
      // role is invalid 
      if (!ROLES.includes(user.rows[0]['role'])) {
        res.status(401).json({
          message : "401 Invalid Role"
        })
      }
      if (user.rows[0]['role'] === "admin") {
        // is admin
        next();
      } else {
        // not admin
        res.status(403).json({
          message : "403 Forbidden"
        })
      }
    } catch (error) {
      res.status(500).json({
        message : error.message
      })  
    }
  }
  
  module.exports = { roleCheck, adminCheck }


