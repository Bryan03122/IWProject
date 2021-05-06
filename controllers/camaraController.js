const connection = require('../database/db')


exports.save = (req,res) => {
    const modelo = req.body.modelo
    const marca = req.body.marca
    const montura = req.body.montura
    const resolucion = req.body.resolucion
    const isominimo = req.body.isominimo
    const isomaximo = req.body.isomaximo
    const tamaniosensor = req.body.tamaniosensor
    const precio = req.body.precio

    connection.query('INSERT INTO CAMARA SET ?',{modelo:modelo, marca_id:marca, montura_id:montura, resolucion:resolucion, 
                    isominimo:isominimo, isomaximo:isomaximo, tamaniosensor:tamaniosensor, precio:precio}, (error, results) => {
        if(error){
            console.error(error)
        }else{
            res.redirect('/camaras')
        }
    })
}   

exports.update = (req, res) => {
    const id = req.body.id
    const modelo = req.body.modelo
    const marca = req.body.marca
    const montura = req.body.montura
    const resolucion = req.body.resolucion
    const isominimo = req.body.isominimo
    const isomaximo = req.body.isomaximo
    const tamaniosensor = req.body.tamaniosensor
    const precio = req.body.precio
    connection.query('UPDATE CAMARA SET ? WHERE ID_CAMARA = ?', [{modelo:modelo, marca_id:marca, montura_id:montura, resolucion:resolucion, 
        isominimo:isominimo, isomaximo:isomaximo, tamaniosensor:tamaniosensor, precio:precio}, id], (error, results) =>{
        if(error){
            console.error(error)
        }else{
   
            res.redirect('/camaras')
        }
    } )
}