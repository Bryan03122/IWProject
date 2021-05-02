const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('root', {title: "Inicio"})
})

router.get('/about', (req, res) => {
    res.render('root', {title: "Acerca de"})
})

module.exports = router