const express = require('express')
const router = express.Router()
const connection = require('../database/db')

const title = 'Monturas'

//RUTA PARA PRINCIPAL DE MONTURAS
router.get('/', (req, res) => {
    connection.query('SELECT MONTURA.*, marca.marca FROM MONTURA INNER JOIN marca ON MARCA.ID_MARCA = MONTURA.MARCA_ID', (error, results) => {
        if(error){
            throw error
        }else{
            res.render('./montura/index', {title: title, results:results})        
        }
    })
})

//RUTA PARA CREAR MONTURAS
router.get('/create', (req, res) => {
    connection.query('SELECT * FROM marca', (error, results) => {
        if(error){
            throw error
        }else{
            
            res.render('./montura/create', {title: title, results:results})        
        }
    })
})

//RUTA PARA EDITAR MONTURAS
router.get('/edit/:id', (req, res) => {
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
})


//RUTA PARA ELIMINAR MARCAS
router.get('/delete/:id', (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM montura WHERE id_montura = ?', [id], (error, results) => {
        if(error){
            throw error
        }else{
            res.redirect('/monturas')
        }
    })
})


const crud = require ('../controllers/monturaController')
router.post('/save', crud.save)
router.post('/update', crud.update)

module.exports = router