const express = require('express')
const router = express.Router()
const connection = require('../database/db')

const title = 'Marcas'

//RUTA PARA PRINCIPAL DE MARCAS
router.get('/', (req, res) => {
    connection.query('SELECT * FROM MARCA', (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./marca/index', {title: title, results:results})        
        }
    })
})

//RUTA PARA CREAR MARCAS
router.get('/create', (req, res) => {
    
    res.render('./marca/create', {title: title})
})

//RUTA PARA EDITAR MARCAS
router.get('/edit/:id', (req, res) => {
    const id = req.params.id

    connection.query('SELECT * FROM MARCA WHERE ID_MARCA = ?',[id], (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./marca/edit', {marca:results[0], title:title})
        }
    })
})

//RUTA PARA ELIMINAR MARCAS
router.get('/delete/:id', (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM MARCA WHERE ID_MARCA = ?', [id], (error, results) => {
        if(error){
            throw error
        }else{
            res.redirect('/marcas')
        }
    })
})


const crud = require ('../controllers/marcaController')
router.post('/save', crud.save)
router.post('/update', crud.update)

module.exports = router