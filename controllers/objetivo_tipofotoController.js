const connection = require('../database/db')
const title = 'Tipo de Foto - Objetivos'

const index = (req, res) => {
    connection.query('SELECT objetivo_tipofoto.*, objetivo.modelo FROM objetivo_tipofoto INNER JOIN objetivo ON objetivo.id_objetivo = objetivo_tipofoto.id_objetivo', (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./objetivo_tipofoto/index', {title: title, results:results})        
        }
    })
}

const create = (req, res) => {
    connection.query('SELECT * FROM objetivo',(err, result) => {
        if(err){
            throw err
        }else{    
            res.render('./objetivo_tipoFoto/create', {objetivo:result, title:title})        
        }
    })
}

const edit = (req, res) => {
    const id = req.params.id

    connection.query('SELECT objetivo_tipofoto.*, objetivo.modelo FROM objetivo_tipofoto INNER JOIN objetivo ON objetivo.id_objetivo = objetivo_tipofoto.id_objetivo WHERE id_objetivo_tipofoto = ?',[id], (error, results) => {
        if(error){
            throw error
        }else{
            connection.query('SELECT * FROM objetivo',(err, result) => {
                if(err){
                    throw err
                }else{
                  res.render('./objetivo_tipofoto/edit', {objetivo_tipofoto:results[0], objetivo:result, title:title})                        
                }
            })
           
        }
    })
}

const remove = (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM objetivo_tipofoto WHERE id_objetivo_tipofoto = ?', [id], (error, results) => {
        if(error){
            throw error
        }else{
            res.redirect('/objetivo_tipofoto')
        }
    })
}

const save = (req,res) => {
    const id_objetivo = req.body.objetivo
    const tipofoto = req.body.tipofoto
    connection.query('INSERT INTO objetivo_tipofoto SET ?',[{id_objetivo:id_objetivo, tipofoto:tipofoto}], (error, results) => {
        if(error){
            console.error(error)
        }else{
            res.redirect('/objetivo_tipofoto')
        }
    })
}   

const update = (req, res) => {
    const id = req.body.id
    const id_objetivo = req.body.objetivo
    const tipofoto = req.body.tipofoto
    connection.query('UPDATE objetivo_tipofoto SET ? WHERE id_objetivo_tipofoto = ?', [{id_objetivo:id_objetivo, tipofoto:tipofoto}, id], (error, results) =>{
        if(error){
            console.error(error)
        }else{
            
            res.redirect('/objetivo_tipofoto')
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