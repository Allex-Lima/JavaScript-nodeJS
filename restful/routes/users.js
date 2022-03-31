const NeDB = require('nedb');
const dataBase = new NeDB({
    filename: 'users.db',
    autoload: true
});


module.exports = (app) => {
    app.get('/users', (req, res) => {
        dataBase.find({}).sort({name: 1}).exec((err, users) => {
            if (err) {
                console.log(`error: ${err}`);
                res.status(400).json({
                    error: err
                });
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users
                });
            }
        })
    });
    
    app.post('/users', (req, res) => {
        dataBase.insert(req.body, (err, user) => {
            if (err) {
                console.log(`error: ${err} Bad Request`);
                res.status(400).json({
                    error: err
                });
            } else {
                res.status(200).json(user);
            }
        })
    });
};