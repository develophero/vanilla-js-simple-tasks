// This is a very simple API that simulates getting, putting, posting and deleting data
// from a in-memory "database" (which will only be live for the duration of the server running)
// This file isn't meant to be a model for a future production server!
// --------------------------------- Begin "database"
var FakeDbModel = (function () {
    function FakeDbModel(objects) {
        // Initialize some data
        this.objects = objects;
    }
    FakeDbModel.prototype.get = function (id) {
        if (isDefined(id)) {
            return this.getObjectById(id);
        }
        return null;
    };
    FakeDbModel.prototype.getAll = function () {
        return this.objects;
    };
    FakeDbModel.prototype.add = function (object) {
        if (object && !isDefined(object.id)) {
            // Objects shouldn't have ID! Taken care of by database
            var newId = this.objects.length;
            object.id = newId;
            this.objects.push(object);
            return object;
        }
        return object;
    };
    FakeDbModel.prototype.edit = function (id, edits) {
        var object = this.getObjectById(id);
        if (object) {
            // Copy properties into the object (except for ID)
            for (var key in edits) {
                if (key !== 'id') {
                    object[key] = edits[key];
                }
            }
            return object;
        }
        return object;
    };
    FakeDbModel.prototype.delete = function (id) {
        var index = this.getIndexById(id);
        if (isDefined(index)) {
            this.objects.splice(index, 1);
            return true;
        }
        return false;
    };
    // Utility functions to find objects
    FakeDbModel.prototype.getObjectById = function (id) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === id) {
                return this.objects[i];
            }
        }
        return null;
    };
    FakeDbModel.prototype.getIndexById = function (id) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id === id) {
                return i;
            }
        }
        return null;
    };
    return FakeDbModel;
}());
var usersFakeDb = new FakeDbModel([
    {
        id: 0,
        name: 'Bob',
        color: 'blue'
    },
    {
        id: 1,
        name: 'Alice',
        color: 'green'
    }
]);
var oneDayAgo = new Date().getTime() - 1000 * 60 * 60 * 24;
var twoDaysAgo = new Date().getTime() - 1000 * 60 * 60 * 48;
var threeDaysAgo = new Date().getTime() - 1000 * 60 * 60 * 72;
var todosFakeDb = new FakeDbModel([
    {
        id: 0,
        content: 'Learn JavaScript',
        done: false,
        userId: 0,
        created: oneDayAgo
    },
    {
        id: 1,
        content: 'Learn TypeScript',
        done: false,
        userId: 0,
        created: twoDaysAgo
    },
    {
        id: 2,
        content: 'Learn Angular',
        done: false,
        userId: 1,
        created: threeDaysAgo
    }
]);
var PORT = 4000;
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// Listen on port 4000
var server = app.listen(PORT, function () {
    console.info('Listening on *:' + PORT);
});
// Set up body parsing to get details from request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Allow cross origin requests for the purposes of
// using npm start to keep compiling typescript
// Not acceptable for prod servers!
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// --------------------------------- Simple Routing using Express
var usersUrl = '/users';
var todosUrl = '/todos';
// ------------------- Users
var router = express.Router();
router.get('/', function (req, res) {
    res.status(200).json(usersFakeDb.getAll());
});
router.get('/:id', function (req, res) {
    var id = +req.params.id;
    var user = usersFakeDb.get(id);
    if (!user) {
        res.status(400).json({
            'message': 'no such user'
        });
    }
    else {
        res.status(200).json(user);
    }
});
router.patch('/:id', function (req, res) {
    var id = +req.params.id;
    var properties = req.body.properties;
    if (!isDefined(id) || !isDefined(properties)) {
        res.status(400).json({
            'message': 'id and properties required'
        });
    }
    else {
        var user = usersFakeDb.edit(id, properties);
        if (!user) {
            res.status(400).json({
                'message': 'No such todo'
            });
        }
        else {
            // Edit success
            res.status(200).json({
                todo: user
            });
        }
    }
});
router.post('/', function (req, res) {
    var properties = req.body.properties;
    if (!isDefined(properties)) {
        res.status(400).json({
            'message': 'properties required on body'
        });
    }
    else {
        var user = usersFakeDb.add(properties);
        if (!user) {
            res.status(400).json({
                'message': 'properties required and properties must not contain ID'
            });
        }
        else {
            // Add success
            res.status(200).json(user);
        }
    }
});
router.delete('/:id', function (req, res) {
    var id = +req.params.id;
    if (!isDefined(id)) {
        res.status(400).json({
            'message': 'id required'
        });
    }
    else {
        if (!usersFakeDb.delete(id)) {
            res.status(400).json({
                'message': 'No such user'
            });
        }
        else {
            // Edit success
            res.sendStatus(200);
        }
    }
});
app.use(usersUrl, router);
// ------------------- ToDos
router = express.Router();
router.get('/', function (req, res) {
    res.status(200).json(todosFakeDb.getAll());
});
router.get('/:id', function (req, res) {
    var id = +req.params.id;
    var todo = todosFakeDb.get(id);
    if (!todo) {
        res.status(400).json({
            'message': 'no such todo'
        });
    }
    else {
        res.status(200).json(todo);
    }
});
router.patch('/:id', function (req, res) {
    var id = +req.params.id;
    var properties = req.body.properties;
    if (!isDefined(id) || !isDefined(properties)) {
        res.status(400).json({
            'message': 'id and properties required'
        });
    }
    else {
        var todo = todosFakeDb.edit(id, properties);
        if (!todo) {
            res.status(400).json({
                'message': 'No such todo'
            });
        }
        else {
            // Edit success
            res.status(200).json({
                todo: todo
            });
        }
    }
});
router.post('/', function (req, res) {
    var properties = req.body.properties;
    if (!isDefined(properties)) {
        res.status(400).json({
            'message': 'properties required on body'
        });
    }
    else {
        var todo = todosFakeDb.add(properties);
        if (!todo) {
            res.status(400).json({
                'message': 'properties required and properties must not contain ID'
            });
        }
        else {
            // Add success
            res.status(200).json(todo);
        }
    }
});
router.delete('/:id', function (req, res) {
    var id = +req.params.id;
    if (!isDefined(id)) {
        res.status(400).json({
            'message': 'id required'
        });
    }
    else {
        if (!todosFakeDb.delete(id)) {
            res.status(400).json({
                'message': 'No such todo'
            });
        }
        else {
            // Edit success
            res.sendStatus(200);
        }
    }
});
app.use(todosUrl, router);
// Utility function
function isDefined(x) {
    return x !== undefined && x !== null;
}
