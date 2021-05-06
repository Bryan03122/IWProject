const connection = require('../database/db')


exports.save = (req,res) => {
    const user = req.body.user
    const password = req.body.password
    connection.query('INSERT INTO USERS SET ?',{user:user, password:password}, (error, results) => {
        if(error){
            console.error(error)
        }else{
            res.redirect('/users')
        }
    })
}   

exports.update = (req, res) => {
    const id = req.body.id
    const user = req.body.user
    const password = req.body.password
    connection.query('UPDATE USERS SET ? WHERE ID = ?', [{user:user, password:password}, id], (error, results) =>{
        if(error){
            console.error(error)
        }else{
            res.redirect('/users')
        }
    } )
}