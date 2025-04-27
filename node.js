const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',function(req,res){
    res.render('portfolio.ejs');
})

app.post('/create',function(req,res){
    fs.writeFile(`./files/${req.body.fullname.split(' ').join('')}.txt`,`Name - ${req.body.fullname} ,Email - ${req.body.email} ,Message - ${req.body.message}`,function(err){
        res.redirect('/');
    });
})

app.listen(3000,function(){
    console.log('good');
})