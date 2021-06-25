const connection = require('../database/db')
const title = 'Monturas'

const index = (req, res) => {
    connection.query('SELECT MONTURA.*, marca.marca FROM MONTURA INNER JOIN marca ON MARCA.ID_MARCA = MONTURA.MARCA_ID', (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./montura/index', {title: title, results:results})        
        }
    })
}

const create = (req, res) => {
    connection.query('SELECT * FROM marca', (error, results) => {
        if(error){
            throw error
        }else{
            
            res.render('./montura/create', {title: title, results:results})        
        }
    })
}
const edit = (req, res) => {
    const id = req.params.id

    connection.query('SELECT MONTURA.*, marca.marca FROM MONTURA INNER JOIN marca ON MARCA.ID_MARCA = MONTURA.MARCA_ID WHERE id_montura = ? ',[id], (error, results) => {
        if(error){
            throw error
        }else{
            connection.query('SELECT * FROM marca',(err, result) => {
                if(err){
                    throw err
                }else{
                    res.render('./montura/edit', {montura:results[0], marca:result, title:title})
                }
            })
           
        }
    })
}

const remove = (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM montura WHERE id_montura = ?', [id], (error, results) => {
        if(error){
            throw error
        }else{
            res.redirect('/monturas')
        }
    })
}

const save = (req,res) => {
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

const update = (req, res) => {
    const id = req.body.id
    const modelo = req.body.montura
    const marca_id = req.body.marca
    connection.query('UPDATE MONTURA SET ? WHERE ID_MONTURA = ?', [{modelo:modelo, marca_id:marca_id}, id], (error, results) =>{
        if(error){
            console.error(error)
        }else{
            
            res.redirect('/monturas')
        }
    } )
}

module.exports = {
    index: index,
    create: create,
    edit: edit,
    remove: remove,
    save: save,
    update: update
}