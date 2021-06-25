const connection = require('../database/db')
const title = 'Cámaras'
const objetivoController = require('./objetivoController')


const index = (req, res) => {
    connection.query('SELECT camara.*, marca.marca, montura.modelo AS "montura_modelo"  FROM camara INNER JOIN marca ON MARCA.ID_MARCA = camara.MARCA_ID INNER JOIN montura ON montura.id_montura = camara.montura_id', (error, results) => {
        if(error){
            throw error
        }else{
              res.render('./camara/index', {title: title, results:results})        
        }
    })
}

const create = (req, res) => {
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
}

const edit = (req, res) => {
    const id = req.params.id
    connection.query('SELECT camara.*, marca.marca, montura.modelo AS "montura_modelo"  FROM camara INNER JOIN marca ON MARCA.ID_MARCA = camara.MARCA_ID INNER JOIN montura ON montura.id_montura = camara.montura_id WHERE id_camara = ?',[id], (error, results) => {
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
}

const remove = (req, res) => {
    const id = req.params.id
    connection.query('DELETE FROM camara WHERE id_camara = ?', [id], (error, results) => {
        if(error){
            throw error
        }else{
            res.redirect('/camaras')
        }
    })
}

const save = (req,res) => {
    const modelo = req.body.modelo
    const marca = req.body.marca
    const montura = req.body.montura
    const resolucion = req.body.resolucion
    const isominimo = req.body.isominimo
    const isomaximo = req.body.isomaximo
    const sensor = req.body.sensor
    const nocturno = req.body.nocturno
    const precio = req.body.precio

    connection.query('INSERT INTO CAMARA SET ?',{modelo:modelo, marca_id:marca, montura_id:montura, resolucion:resolucion, 
                    isominimo:isominimo, isomaximo:isomaximo, sensor:sensor, nocturno:nocturno, precio:precio}, (error, results) => {
        if(error){
            console.error(error)
        }else{
            res.redirect('/camaras')
        }
    })
}   

const update = (req, res) => {
    const id = req.body.id
    const modelo = req.body.modelo
    const marca = req.body.marca
    const montura = req.body.montura
    const resolucion = req.body.resolucion
    const isominimo = req.body.isominimo
    const isomaximo = req.body.isomaximo
    const sensor = req.body.sensor
    const nocturno = req.body.nocturno
    const precio = req.body.precio
    connection.query('UPDATE CAMARA SET ? WHERE ID_CAMARA = ?', [{modelo:modelo, marca_id:marca, montura_id:montura, resolucion:resolucion, 
        isominimo:isominimo, isomaximo:isomaximo,  sensor:sensor, nocturno:nocturno, precio:precio}, id], (error, results) =>{
        if(error){
            console.error(error)
        }else{
   
            res.redirect('/camaras')
        }
    } )
}


const presets = (req, res) => {
    connection.query('SELECT COUNT(*) AS total, marca.marca, pregunta2, pregunta3, pregunta4 FROM resultado INNER JOIN marca ON marca.id_marca = resultado.pregunta1 GROUP BY pregunta1, pregunta2, pregunta3, pregunta4 ORDER BY 1 DESC LIMIT 3', (error, results) => {
        if(error){
            console.error(error)
        }else{
            res.render('presets', {resultadoPresets: results})
        }
    })
}

const resultado = (req, res) => {
    const marca = req.body.marca
    const precioCamara = req.body.precioCamara
    const sensor = req.body.sensor
    const noche = req.body.noche
    const precioObjetivo = req.body.precioObjetivo
    const retrato = req.body.retrato
    const paisaje = req.body.paisaje
    const producto = req.body.producto
    const urbano = req.body.urbano
    const macrofotografia = req.body.macrofotografia
    const casual = req.body.casual
    const insertSQL = "INSERT INTO resultado(pregunta1, pregunta2, pregunta3, pregunta4) VALUES('"+marca+"', '"+precioCamara.replace('AND precio', ' | ')+"', '"+sensor+"', '"+noche+"')"
    connection.query(insertSQL)
    
    let tipofotostr = (retrato ? "'retrato',":"")+(paisaje ? "'paisaje',":"")+(producto ? "'producto',":'')+(urbano ? "'urbano',":'')+(macrofotografia ? "'macrofotografia',":'')+(casual ? "'casual',":'') 
    tipofotostr = tipofotostr.replace(/.$/,"")
    if(tipofotostr == ""){
        tipofotostr = "'casual'"
    }
    console.log(tipofotostr)

    const sqlCamara = "SELECT * FROM camara INNER JOIN marca ON camara.marca_id = marca.id_marca WHERE marca_id = "+marca+" OR (precio "+precioCamara+") OR sensor = '"+sensor+"' OR nocturno = '"+noche+"' ORDER BY marca.marca ASC";
    connection.query(sqlCamara ,(err, result) => {
        if(err){
            throw err
        }else{        
            resultadosCamaras = calcularAfinidadCamara(marca, precioCamara, sensor, noche, result)
            for(let i = 0; i < resultadosCamaras.length; i++){
                const sqlObjetivo = "SELECT objetivo.*, objetivo_tipofoto.tipofoto FROM objetivo INNER JOIN objetivo_tipofoto ON objetivo_tipofoto.id_objetivo = objetivo.id_objetivo WHERE objetivo.montura_id = "+resultadosCamaras[i].montura_id+" AND objetivo_tipofoto.tipofoto IN ("+tipofotostr+") AND objetivo.precio "+precioObjetivo
                connection.query(sqlObjetivo, (err, results) => {
                    if(err){
                        throw err
                    }else {
                        resultadosCamaras[i].objetivos = results
                        if(i == (resultadosCamaras.length - 1)){
                            renderizarVista(res, resultadosCamaras) 
                        }        
                    }

                })
            }
        }
    })
}

const renderizarVista = (res, resultadosCamaras) => {
    console.log(resultadosCamaras)
    res.render('resultados', {resultadosCamaras: resultadosCamaras})
}

const calcularAfinidadCamara = (marca, precioCamara, sensor, noche, result) => {
    let marcaNota, precioCamaraNota, sensorNota, nocheNota, total
    for(let i = 0; i < result.length; i++){
         marcaNota = result[i].marca_id == marca ?1:0
        if(precioCamara == '< 800'){
             precioCamaraNota = result[i].precio < 800 ?1:0
        }else if(precioCamara == '>=800 AND precio <1000'){
             precioCamaraNota = result[i].precio >=800 && result[i].precio < 1500 ?1:0
        }else{
             precioCamaraNota = result[i].precio >=1500?1:0
        }
         sensorNota = result[i].sensor == sensor ?1:0 
         nocheNota = result[i].nocturno == noche ?1:0
         total = (marcaNota + precioCamaraNota + sensorNota + nocheNota)/4
         result[i].afinidad = Math.round((total + Number.EPSILON) * 100) / 100
    }
    result.sort(function(a, b){return b.afinidad - a.afinidad })
    const resultadosCamaras = result.slice(0, 3)
    return resultadosCamaras
}

module.exports = {
    index: index,
    create: create,
    edit: edit,
    remove: remove,
    save: save,
    update: update,
    resultado: resultado,
    presets: presets
}