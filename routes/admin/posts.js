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
    let sql = "SELECT * FROM posts";
    db.query(sql, function (err, result, fields){
        if (err)   {
            throw err;
        }
        console.log("found " + result[0].post_title);
        res.render('admin/posts', {data:result});
    });


});

router.get('/edit/:post_id', (req, res)=>{
    sql = "SELECT * FROM posts WHERE post_id = '"+req.params.post_id+"'" ;
    db.query(sql, function (err, result, fields){
        console.log(result + " " + fields +" "+  req.params.post_id);
        res.render('admin/posts/edit', {post: result});
    });
});



router.post('/create', (req, res)=>{
    let title = req.body.title;
    let author = req.body.author;
    let date = req.body.date;
    let image = req.body.image_file;
    let content = req.body.content;
    let tags = req.body.tags;

    let sql = "INSERT INTO posts (post_title, post_author, post_date, post_image, post_content, post_tags)";
    sql += " VALUES ('"+ title + "', '"+ author +"', '"+ date +"', '"+ image +"', '"+ content +"', '"+ tags +"')";
    db.query(sql, function (err, result){
      if (err)   {
          throw err;
      }
        console.log('Inserted Record');
    });

    res.render('admin/posts/create');
});

module.exports = router;
