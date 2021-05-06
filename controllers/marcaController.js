const connection = require('../database/db')


exports.save = (req,res) => {
    const marca = req.body.marca
    connection.query('INSERT INTO MARCA SET ?',{marca:marca}, (error, results) => {
        if(error){
            console.error(error)
        }else{
            res.redirect('/marcas')
        }
    })
}   

exports.update = (req, res) => {
    const id = req.body.id
    const marca = req.body.marca
    connection.query('UPDATE MARCA SET ? WHERE ID_MARCA = ?', [{marca:marca}, id], (error, results) =>{
        if(error){
            console.error(error)
        }else{
   
            res.redirect('/marcas')
        }
    } )
}