const express = require('express')
const router = express.Router()
const crud = require ('../controllers/marcaController')

router.get('/', crud.index)
router.get('/create', crud.create)
router.get('/edit/:id', crud.edit)
router.get('/delete/:id', crud.remove)
router.post('/save', crud.save)
router.post('/update', crud.update)

module.exports = router