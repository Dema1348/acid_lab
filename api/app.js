const express = require('express');
var cors = require('cors')
const logger = require('morgan');
const bodyParser = require('body-parser');


const routerPing = require('./routes/ping');
const routerSearch = require('./routes/search');



let app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/ping', routerPing);
app.use('/api/search', routerSearch);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Staring in port ', PORT || 3000);
});



module.exports = app;
