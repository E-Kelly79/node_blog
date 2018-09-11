const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const app = express();
const mysql = require('mysql');

var db = mysql.createConnection({
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

//Load Routes
const home = require('./routes/home/main');
const admin = require('./routes/admin/admin');
const posts = require('./routes/admin/posts');




//Set view engine
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');


//Use routes
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);



app.listen(8080, ()=>{
    console.log(`listening on port 4500`);
});

module.exports = app;
