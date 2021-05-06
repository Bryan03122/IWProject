const { json } = require('express')
const express = require('express')
const router = require('./router/router')
const app = express()
const port = 3000

//Motor Plantillas
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.urlencoded({extended: false}))
app.use(express(json))

////////////////RUTAS//////////////////

//Rutas estáticas
app.use(express.static(__dirname + '/public'))

app.use('/', require('./router/router'))

// //Rutas Protegidas
// app.get('/profile', (req, res) => {
//     res.render('profile', {title: "Perfil"})
// })

// app.get('/users', (req, res) => {
//     res.render('users', {title: "Usuarios"})
// })

// app.get('/cameras', (req, res) => {
//     res.render('cameras', {title: "Cámaras"})s
// })

// app.get('/lens', (req, res) => {
//     res.render('lens', {title: "Objetivos"})
// })
app.use('/users', require('./router/users'))
app.use('/marcas', require('./router/marca'))
app.use('/monturas', require('./router/montura'))
app.use('/camaras', require('./router/camara'))



app.use((req, res, next) => {
    res.status(404).render('404',{
        title: "404"
    })
})

//Activar Servidor
app.listen(port, ()=>{
   
    console.log('Active Server on port ', port)
})

