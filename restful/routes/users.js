const NeDB = require('nedb');
const dataBase = new NeDB({
    filename: 'users.db',
    autoload: true
});


module.exports = (app) => {
    let route = app.route('/users');

    route.get((req, res) => {
        dataBase.find({}).sort({name: 1}).exec((err, users) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    users
                });
            }
        })
    });
    
    route.post((req, res) => {
        dataBase.insert(req.body, (err, user) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        })
    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res) => {
        dataBase.findOne({_id:req.params.id}).exec((err, user) => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(user);
            }
        })
    });

    routeId.put((req, res) => {
        dataBase.update({_id: req.params.id}, req.body, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.body, req.params));
            }
        })
    });

    routeId.delete((req, res) => {
        dataBase.remove({_id: req.params.id}, {}, err => {
            if (err) {
                app.utils.error.send(err, req, res);
            } else {
                res.status(200).json(Object.assign(req.params));
            }
        });
    });

};