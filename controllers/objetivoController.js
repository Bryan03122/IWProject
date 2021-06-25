const connection = require('../database/db')
const title = 'Objetivos'


const index = (req, res) => {
    connection.query('SELECT objetivo.*, marca.marca, montura.modelo AS "montura_modelo" FROM objetivo INNER JOIN marca ON MARCA.ID_MARCA = objetivo.MARCA_ID INNER JOIN montura ON montura.id_montura = objetivo.montura_id', (error, results) => {
        if(error){
            throw error
        }else{
            // console.log(results)
            res.render('./objetivo/index', {title: title, results:results})        
        }
    })
}
const create = (req, res) => {
    connection.query('SELECT * FROM marca',(err, result) => {
        if(err){
            throw err
        }else{
            connection.query('SELECT * FROM montura',(err, resultado) => {
                if(err){
                    throw err
                }else{
                    res.render('./objetivo/create', {marca:result, montura:resultado, title:title})
                }
            })
        }

    })
}
const edit = (req, res) => {
    const id = req.params.id

    connection.query('SELECT objetivo.*, marca.marca, montura.modelo AS "montura_modelo" FROM objetivo INNER JOIN marca ON MARCA.ID_MARCA = objetivo.MARCA_ID INNER JOIN montura ON montura.id_montura = objetivo.montura_id WHERE id_objetivo = ?',[id], (error, results) => {
        if(error){
            throw error
        }else{
            connection.query('SELECT * FROM marca',(err, result) => {
                if(err){
                    throw err
                }else{
                    connection.query('SELECT * FROM montura',(err, resultado) => {
                        if(err){
                            throw err
                        }else{
                            res.render('./objetivo/edit', {objetivo:results[0], marca:result, montura:resultado, title:title})
                        }
                    })
                }
            })
           
        }
    })
}
const remove = (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM objetivo WHERE id_objetivo = ?', [id], (error, results) => {
        if(error){
            throw error
        }else{
            res.redirect('/objetivos')
        }
    })
}


const save = (req,res) => {
    const modelo = req.body.modelo
    const marca = req.body.marca
    const montura = req.body.montura
    const distanciaFocalMinima = req.body.distanciaFocalMinima
    const distanciaFocalMaxima = req.body.distanciaFocalMaxima
    const aperturaMinima = req.body.aperturaMinima
    const aperturaMaxima = req.body.aperturaMaxima
    const precio = req.body.precio

    // const retrato = req.body.retrato
    // const paisaje = req.body.paisaje
    // const producto = req.body.producto
    // const urbano = req.body.urbano
    // const macrofotografia = req.body.macrofotografia
    // const casual = req.body.casual

    // const tipoFoto = [retrato, paisaje, producto, urbano, macrofotografia, casual]
    // for(let i = 0; i < tipoFoto.length; i++){
    //     if(tipoFoto[i] === undefined){
    //         tipoFoto.splice(i, 1)
    //         i--
    //     }
    // }
    // console.log(tipoFoto)
    // res.redirect('/objetivos')
    connection.query('INSERT INTO objetivo SET ?',{modelo:modelo, marca_id:marca, montura_id:montura, distanciaFocalMinima:distanciaFocalMinima, 
                    distanciaFocalMaxima:distanciaFocalMaxima, aperturaMinima:aperturaMinima, aperturaMaxima:aperturaMaxima, precio:precio}, (error, results) => {
        if(error){
            console.error(error)
        }else{
            // for(i=0; i<tipoFoto.length; i++){
            //     connection.query('INSERT INTO objetivo_tipofoto SET', {tipofoto:tipoFoto[i], id_objetivo}, (error, results) => {
            //         if(error){
            //             console.error(error)
            //         }
                    
            //     })
            // }
            res.redirect('/objetivos')
        }
    })
}   

const update = (req, res) => {
    const id = req.body.id
    const modelo = req.body.modelo
    const marca = req.body.marca
    const montura = req.body.montura
    const distanciaFocalMinima = req.body.distanciaFocalMinima
    const distanciaFocalMaxima = req.body.distanciaFocalMaxima
    const aperturaMinima = req.body.aperturaMinima
    const aperturaMaxima = req.body.aperturaMaxima
    const precio = req.body.precio

    const retrato = req.body.retrato
    const paisaje = req.body.paisaje
    const producto = req.body.producto
    const urbano = req.body.urbano
    const macrofotografia = req.body.macrofotografia
    const casual = req.body.casual

    const tipoFoto = [retrato, paisaje, producto, urbano, macrofotografia, casual]
    for(let i = 0; i < tipoFoto.length; i++){
        if(tipoFoto[i] === undefined){
            tipoFoto.splice(i, 1)
            i--
        }
    }
    connection.query('UPDATE objetivo SET ? WHERE id_objetivo = ?', [{modelo:modelo, marca_id:marca, montura_id:montura, distanciaFocalMinima:distanciaFocalMinima, 
        distanciaFocalMaxima:distanciaFocalMaxima, aperturaMinima:aperturaMinima, aperturaMaxima:aperturaMaxima, precio:precio}, id], (error, results) =>{
        if(error){
            console.error(error)
        }else{
            // for(i=0; i<tipoFoto.length; i++){
            //     connection.query('INSERT INTO objetivo_tipofoto SET ?', {tipofoto:tipoFoto[i], id_objetivo:id}, (error, results) => {
            //         if(error){
            //             console.error(error)
            //         }
                    
            //     })
            // }
            res.redirect('/objetivos')
        }
    } )
}

const getObjetivoByMontura = (montura_id) => {
    
        const sqlObjetivoMontura = "SELECT * FROM objetivo WHERE montura_id = "+montura_id
        connection.query(sqlObjetivoMontura, (err, result) => {
        if(err){
            throw err
        }else {
            return result
        }
    })
    
    
    
}

module.exports = {
    index: index,
    create: create,
    edit: edit,
    remove: remove,
    save: save,
    update: update,
    getObjetivoByMontura: getObjetivoByMontura
}