const express = require('express');
const conectarDB = require('./config/db');

const app = express();
const bodyparser = require('body-parser');

conectarDB();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({limit:'50mb', extended:true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api',require('./routes/producto'));
app.use('/api',require('./routes/cupon'));
app.use('/api',require('./routes/config'));

app.listen(4201, () =>{
    console.log('El servidor esta corriendo perfectamente');
})
