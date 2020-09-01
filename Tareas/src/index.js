const express=require('express');
const cors =require('cors');
const path=require('path');
const app=express();

//const indexRoutes=require('./routes/index');
const tasksRoutes=require('./routes/tasks');
const { dirname } = require('path');

app.set('views', path.join(__dirname,'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');

//middleawares--- funciones que se ejecutan antes de recibir la informacion navegador o clientes
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//rutas
//app.use(indexRoutes);
app.use('/api',tasksRoutes);


//static files-carpeta dist copiada de client angular
app.use(express.static(path.join(__dirname,'dist/client')));

//etatic server
app.listen(app.get('port'), ()=>{
    console.log('server en puerto', app.get('port'));
});
