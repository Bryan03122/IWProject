const connection = require('../database/db')
const title = 'Usuarios'

const index = (req, res) => {
    connection.query('SELECT * FROM USERS', (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./users/index', {title: title, results:results})        
        }
    })
}

const create = (req, res) => {
    res.render('./users/create', {title: title})
}

const edit = (req, res) => {
    const id = req.params.id
    connection.query('SELECT * FROM USERS WHERE ID = ?',[id], (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./users/edit', {user:results[0], title:title})
        }
    })
}

const remove = (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM USERS WHERE ID = ?', [id], (error, results) => {
        if(error){
            throw error
        }else{
            res.redirect('/users')
        }
    })
}

const save = (req,res) => {
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

const update = (req, res) => {
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


module.exports = {
    index: index,
    create: create,
    edit: edit,
    remove: remove,
    save: save,
    update: update
}