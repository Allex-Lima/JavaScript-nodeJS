const express = require('express');
const routesIndex = require('./routes/index');
const routesUsers = require('./routes/users');
let app = express();


app.use('/',routesIndex);
app.use('/users',routesUsers);

app.listen(3000, '127.0.0.1', () => {
    console.log('Server Run');
})