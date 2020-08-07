var  express = require("express");
var  router	=	express.Router();
var fs = require('fs');
const axios = require('axios').default;

router.get("/quiniela/sorteos", function(req, res){  
  
   res.render('sorteos', {title: "Sorteos"})
});

router.get("/quiniela/sorteos/:extGameDayId", function(req, res){
  var query = req.query.extGameDayId;
  console.log(query);
      
  var url = "http://localhost:3000/api/ganadores/quiniela/" + query;    
    
  axios.get(url)
    .then(response => {
      fs.writeFile(`../public/WPR_80_${query}.json`, JSON.stringify(response.data), function (err) {
        if (err) return console.log(err);
        console.log('Archivo generado');
        })
      
      res.render("rsorteos", {data: response.data, title: "Sorteos"})    
      })
    .catch(function (error) {
      if (error.response.status==404) {
        res.render("sorteos", {error: error.response.data.message, title: "Sorteos"});              
      } else {
        res.render("sorteos", {errorToken: error.response.data.message, title:"Sorteos"});              
      }
    });    
});

router.get("/quiniela/ganadores/json", function(req, res){
  let query = req.query.extGameDayId;
  res.download(`../public/WPR_80_${query}.json`);          
        
});

module.exports = router;