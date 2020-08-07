var  express = require("express");
var  router	=	express.Router();
const axios = require('axios').default;
const _= require('lodash');
var fs = require('fs');
var entreRios = require('../config/entreRios.json');

router.get("/quiniela/instancias", function(req, res){
      
    res.render("instancias", {title: "Instancias "});
});

router.get("/quiniela/instancias/rango", function(req, res){
    const data = {};
    data.extGameDayFrom = req.query.extGameDayFrom;
    data.extGameDayTo = req.query.extGameDayTo;
    console.log(data);
    var url = "http://localhost:3000/api/quiniela/instances/rango";
    
  if (data.extGameDayFrom > data.extGameDayTo) {
    //req.flash("error", "El primer parametro debe ser menor al segundo");  
    res.render("instancias", {title: "Sorteos", errorInput: "error"})     
    } else {
  
    axios({
        method: 'get',
        url: url,
        params: {
          extGameDayFrom: data.extGameDayFrom,
          extGameDayTo: data.extGameDayTo 
        }   
    }).then(response => {
        //Clonar la respuesta y guardarla en otro archivo para entre rios
      let entreRiosRes = _.cloneDeep(response.data);  
      for(let i=0; i<entreRiosRes["gameDay"].length; i++){
         entreRiosRes["gameDay"][i]["gameDay"]["attributes"]["betMinPrice"] = entreRios.betMinPrice;                  
         entreRiosRes["gameDay"][i]["gameDay"]["attributes"]["betMaxPrice"] = entreRios.betMaxPrice;
         entreRiosRes["gameDay"][i]["gameDay"]["Instances"] = entreRios.Instances;
        }
            
        fs.writeFile(`../public/lotba/gameDays_${data.extGameDayFrom}_To_${data.extGameDayTo}.json`, JSON.stringify(response.data), function (err) {
        if (err) return console.log(err);
        console.log('Archivo generado');
        })
        fs.writeFile(`../public/entreRios/gameDays_${data.extGameDayFrom}_To_${data.extGameDayTo}.json`, JSON.stringify(entreRiosRes), function (err) {
          if (err) return console.log(err);
          console.log('Archivo generado');
        })
        res.render("rinstancias", {title: "resultados", data: response.data}) 
        })
        .catch(function (error) {
            if (error.response.status==404) {
              res.render("instancias", {title: "Resultados", error: error.response.data.message});              
            } else {
                res.render("instancias", {title: "Resultados", errorToken: error.response.data.message});              
            }
          }); 
    }    
});

router.get("/quiniela/instancias/json", function(req, res){
    const data = {};
    data.extGameDayFrom = req.query.extGameDayFrom;
    data.extGameDayTo = req.query.extGameDayTo;
    
    res.download(`..public/lotba/gameDays_${data.extGameDayFrom}_To_${data.extGameDayTo}.json`);      
    
});

router.get("/quiniela/instancias/Lotba/:extGameDayFrom-:extGameDayTo", function(req, res){
  const from = req.params.extGameDayFrom;
  const to = req.params.extGameDayTo
  res.download(`../public/lotba/gameDays_${from}_To_${to}.json`);      
});
router.get("/quiniela/instancias/entreRios/:extGameDayFrom-:extGameDayTo", function(req, res){
  const from = req.params.extGameDayFrom;
  const to = req.params.extGameDayTo
  res.download(`../public/entreRios/gameDays_${from}_To_${to}.json`);      
});

module.exports = router;