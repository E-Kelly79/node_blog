const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "classes"
});

db.connect(function(error){
    if(!error){
        console.log('Connected');
    }else{
        console.log('error ' + error);
    }
});


router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res)=>{
    res.send('It Works');
});

router.get('/create', (req, res)=>{
    res.render('admin/posts/create');
});

router.post('/create', (req, res)=>{

    let sql = ("INSERT INTO posts (post_title) VALUES ('"+ req.body.title + "')");
    db.query(sql, function (err, result){
      if (err)   {
          throw err;
      }
        console.log('Table Created');
    });

});


module.exports = router;
