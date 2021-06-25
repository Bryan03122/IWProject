const { json } = require('express')
const express = require('express')
const app = express()
const port = 3000
const sequelize = require('./database/connection')
// dbConnection() {
//     try {
//         db.authenticate()
//     } catch (error) {
//         throw new Error(error)
//     }
// }
//Motor Plantillas
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.urlencoded({extended: false}))
app.use(express(json))

const session = require('express-session')
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(express.static(__dirname + '/public'))

app.use('/', require('./router/router'))
app.use('/users', require('./router/users'))
app.use('/marcas', require('./router/marca'))
app.use('/monturas', require('./router/montura'))
app.use('/camaras', require('./router/camara'))
app.use('/objetivos', require('./router/objetivo'))
app.use('/objetivo_tipofoto', require('./router/objetivo_tipofoto'))
app.use((req, res, next) => {
    res.status(404).render('404',{
        title: "404"
    })
})

//Activar Servidor
app.listen(port, ()=>{
    console.log('Active Server on port ', port)

})

// module.exports = loggedin
