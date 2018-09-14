const express = require('express');
const router = express.Router();
const mysql = require('mysql');

//Create Database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "classes"
});

//Connect to database
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

//create a new recored
router.post('/create', (req, res)=>{
    let sql = "INSERT INTO posts (post_title, post_author, post_date, post_image, post_content, post_tags)";
    sql += " VALUES ('"+ req.body.title + "', '"+ req.body.author +"', '"+ req.body.date +"', '"+ req.body.image_file +"', '"+ req.body.content +"', '"+ req.body.tags +"')";
    db.query(sql, function (err, result){
        if (err)   {
            throw err;
        }
    });
    res.render('admin/posts/create');
});

//Get all records in database and read them
router.get('/', (req, res)=>{
    let sql = "SELECT * FROM posts";
    db.query(sql, function (err, result){
        if (err)   {
            throw err;
        }
        res.render('admin/posts', {data:result});
    });
});

//get data from database and use it to fill fields in edit page
router.get('/edit/:post_id', (req, res)=>{
    sql = "SELECT * FROM posts WHERE post_id = '"+req.params.post_id+"'" ;
    db.query(sql, function (err, result, fields){
        console.log(result[0] + "  "+  req.params.post_id);
        res.render('admin/posts/edit', {post: result[0]});
    });
});

//Update The data
router.put('/edit/:post_id', (req, res)=>{
    sql = "UPDATE posts SET";
    sql += " `post_title` = '"+ req.body.title + "',";
    sql += " `post_author` = '"+ req.body.author + "',";
    sql += " `post_date` = '"+ req.body.date + "',";
    sql += " `post_image` = '"+ req.body.image_file + "',";
    sql += " `post_content` = '"+ req.body.content + "',";
    sql += " `post_tags` = '"+ req.body.tags + "'";
    sql += "WHERE post_id = "+ req.params.post_id + "";

    db.query(sql, function (err, result, fields) {
        if (!err) {
            res.redirect('/admin/posts');
        }else{
            console.log(err);
        }
    });

});
module.exports = router;
