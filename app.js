var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var app = express();


app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res)=>{
  res.render('home/index');
});


app.listen(8080, ()=>{
    console.log(`listening on port 4500`);
});

module.exports = app;
