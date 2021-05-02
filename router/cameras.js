const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('cameras', {title: 'Cámaras'})
})

module.exports = router