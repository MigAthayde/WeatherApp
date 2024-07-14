const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// middlewares:
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'Static')));

// VARIÁVEIS:
let lat;
let long;
let clima;

// Requisições GET:
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/weather', (req, res) => {
    res.render('home', {temp: null, place:null});

})

// Requisições POST:
app.post('/weather', (req,res) => {
    
    if (req.body['local'] == 'RJ')
    {
        lat = -22.9455779;
        long = -43.1907464;
    }
    if (req.body['local'] == 'SP')
        {
            lat = -23.5622582;
            long = -46.6418652;
        }
    const callWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b48ef08f1b44ca22132e472bc32a345c`;

    axios.get(callWeather).then(response =>{
        const weatherResponse = response.data;
        clima = Math.round(weatherResponse['main']['temp'] - 273.15);
        res.render('home',{temp: clima, place:req.body['local']});
        console.log(clima);
    })
    console.log(req.body['local']);

})


// CRIAÇÃO DO SERVER:
const PORT = 3000;

app.listen(PORT, ()=>{
    console.log("Servidor rodando na porta 3000!!!");
})