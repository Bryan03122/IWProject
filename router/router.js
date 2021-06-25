const express = require('express')
const router = express.Router()
const connection = require('../database/db')
const camaraController = require('../controllers/camaraController')

let loggedin = false


router.get('/', (req, res) => {
    res.render('root', {title: "Bienvenido", loggedin})
})

router.get('/about', (req, res) => {
    res.render('about', {title: "Acerca de"})
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/auth', (req, res) => {
    const user = req.body.user
    const password = req.body.password
    if(user && password){
        connection.query('SELECT * FROM users WHERE user = ?', [user], (error, results) => {
            if(results.length == 0 || (password != results[0].password)){
                res.render('login', {
                    alert: true,
                    alertTitle: "Error",
                    alertMessage:"Usuario o Contraseña Incorrectos",
                    alertIcon: "error",
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                })
            }else{
                req.session.loggedin = true
                req.session.name = results[0].name
                res.render('login', {
                    alert: true,
                    alertTitle: "Conexión Exitosa",
                    alertMessage:"Ingreso Correcto",
                    alertIcon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: 'profile'
                })
            }
        })
    }
})


router.get('/preguntas', (req, res) => {
    connection.query('SELECT * FROM marca',(err, result) => {
        if(err){
            throw err
        }else{
            res.render('preguntas', {marca:result})    
        }
    })
    
})

router.post('/resultado', camaraController.resultado)

router.get('/logout', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

router.get('/profile', (req, res)=> {
    if(req.session.loggedin){
         res.render('profile', {
             user: req.session.user
         })
     }
     else{
         res.redirect('login')
     }
 })
 


router.get('/presets', camaraController.presets)

module.exports = router