const connection = require('../database/db')
const title = 'Marcas'

const index = (req, res) => {
    connection.query('SELECT * FROM MARCA', (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./marca/index', {title: title, results:results})        
        }
    })
}

const create = (req, res) => {
    res.render('./marca/create', {title: title})
}

const edit = (req, res) => {
    const id = req.params.id

    connection.query('SELECT * FROM MARCA WHERE ID_MARCA = ?',[id], (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./marca/edit', {marca:results[0], title:title})
        }
    })
}

const remove = (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM MARCA WHERE ID_MARCA = ?', [id], (error, results) => {
        if(error){
            throw error
        }else{
            res.redirect('/marcas')
        }
    })
}

const save = (req,res) => {
    const marca = req.body.marca
    connection.query('INSERT INTO MARCA SET ?',{marca:marca}, (error, results) => {
        if(error){
            console.error(error)
        }else{
            res.redirect('/marcas')
        }
    })
}   

const update = (req, res) => {
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

module.exports ={
    index: index,
    create: create,
    edit: edit,
    remove: remove,
    save: save,
    update: update
}