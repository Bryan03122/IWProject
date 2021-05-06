const connection = require('../database/db')


exports.save = (req,res) => {
    const modelo = req.body.modelo
    const marca_id = req.body.marca
    connection.query('INSERT INTO MONTURA SET ?',[{modelo:modelo, marca_id:marca_id}], (error, results) => {
        if(error){
            console.error(error)
        }else{
            res.redirect('/monturas')
        }
    })
}   

exports.update = (req, res) => {
    const id = req.body.id
    const modelo = req.body.montura
    const marca_id = req.body.marca
    connection.query('UPDATE MONTURA SET ? WHERE ID_MONTURA = ?', [{modelo:modelo, marca_id:marca_id}, id], (error, results) =>{
        if(error){
            console.error(error)
        }else{
            console.log(modelo, marca_id)
            res.redirect('/monturas')
        }
    } )
}