const express = require('express')
const router = express.Router()
const connection = require('../database/db')

const title = 'Cámaras'

//RUTA PRINCIPAL DE CAMARAS
router.get('/', (req, res) => {
    connection.query('SELECT camara.*, marca.marca, montura.modelo AS "montura_modelo"  FROM camara INNER JOIN marca ON MARCA.ID_MARCA = camara.MARCA_ID INNER JOIN montura ON montura.id_montura = camara.montura_id', (error, results) => {
        if(error){
            throw error
        }else{
            console.log(results)
            res.render('./camara/index', {title: title, results:results})        
        }
    })
})

//RUTA PARA CREAR CAMARAS
router.get('/create', (req, res) => {
    connection.query('SELECT * FROM marca',(err, result) => {
        if(err){
            throw err
        }else{
            connection.query('SELECT * FROM montura',(err, resultado) => {
                if(err){
                    throw err
                }else{
                    res.render('./camara/create', {marca:result, montura:resultado, title:title})
                }
            })
            
        }
    })
})


//RUTA PARA EDITAR CAMARAS
router.get('/edit/:id', (req, res) => {
    const id = req.params.id

    connection.query('SELECT camara.*, marca.marca, montura.modelo AS "montura_modelo"  FROM camara INNER JOIN marca ON MARCA.ID_MARCA = camara.MARCA_ID INNER JOIN montura ON montura.id_montura = camara.montura_id',[id], (error, results) => {
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
                            res.render('./camara/edit', {camara:results[0], marca:result, montura:resultado, title:title})
                        }
                    })
                    
                }
            })
           
        }
    })
})

//RUTA PARA ELIMINAR MARCAS
router.get('/delete/:id', (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM camara WHERE id_camara = ?', [id], (error, results) => {
        if(error){
            throw error
        }else{
            res.redirect('/camaras')
        }
    })
})

const crud = require ('../controllers/camaraController')
router.post('/save', crud.save)
router.post('/update', crud.update)

module.exports = router