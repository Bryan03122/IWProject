const express = require('express')
const router = express.Router()
const connection = require('../database/db')

const title = 'Usuarios'
router.get('/', (req, res) => {
    connection.query('SELECT * FROM USERS', (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./users/index', {title: title, results:results})        
        }
    })
})

//RUTA PARA CREAR USUARIOS
router.get('/create', (req, res) => {
    res.render('./users/create', {title: title})
})

//RUTA PARA EDITAR USUARIOS
router.get('/edit/:id', (req, res) => {
    const id = req.params.id
    connection.query('SELECT * FROM USERS WHERE ID = ?',[id], (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./users/edit', {user:results[0], title:title})
        }
    })
})

//RUTA PARA ELIMINAR USUARIOS
router.get('/delete/:id', (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM USERS WHERE ID = ?', [id], (error, results) => {
        if(error){
            throw error
        }else{
            res.redirect('/users')
        }
    })
})

const crud = require ('../controllers/userController')
router.post('/save', crud.save)
router.post('/update', crud.update)

module.exports = router