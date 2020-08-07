var express = require('express');
var axios = require('axios').default;
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {      
 res.render('index', { title: 'Bienvenida' });
});

router.get('/autenticacion', function(req, res, next) {
  res.render('autenticacion', {title: 'Autenticacion'});
});

router.post("/autenticacion", (req, res) => {
  let data = {}
      data.username =  req.body.username;
      data.password = req.body.password;
              
  let url = "http://localhost:3000/api/autenticacion";     
        
  axios.post(url, data).then(response => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + response["data"]["access_token"];
    res.redirect("/tablero")
          
    }).catch(function (error) {
       if (error.response) {
      res.render("autenticacion", {error: error.response.data})
      }
  });       
  
});

router.get("/tablero", (req, res, next)=>{
  res.render("tablero", {title: 'Tablero'});
});


module.exports = router;
