// This is a very simple API that simulates getting, putting, posting and deleting data
// from a in-memory "database" (which will only be live for the duration of the server running)
// This file isn't meant to be a model for a future production server!

// REST API Reference:

// /users
// GET - (): Get all users
// PUT - (id: number, properties: any): Modify a user by id
// POST - (properties: any): Create a new user
// DELETE - (id: number): Delete a user by id

// /todos
// GET - (): Get all todos
// PUT - (id: number, properties: any): Modify a todo by id
// POST - (properties: any): Create a new todo
// DELETE - (id: number): Delete a todo by id

// --------------------------------- Interfaces

interface IObjectWithId {
    id: number;
}

interface User extends IObjectWithId {
    id: number;
    name: string;
}

interface ToDo extends IObjectWithId {
    id: number;
    content: string,
    done: boolean,
    userId: number,
    created: number
}

// --------------------------------- Begin "database"

class FakeDbModel<T extends IObjectWithId> {

    private objects: T[];

    constructor(objects) {
        // Initialize some data
        this.objects = objects;
    }

    get(id: number) {
        if (isDefined(id)) {
            return this.getObjectById(id);
        }
        return null;
    }

    getAll() {
        return this.objects;
    }

    add(object: T): T {
        if (object && !isDefined(object.id)) {
            // Objects shouldn't have ID! Taken care of by database
            let newId = this.objects.length;
            object.id = newId;
            this.objects.push(object);
            return object;
        }
        return object;
    }

    edit(id: number, edits: any): T {
        let object = this.getObjectById(id);
        if (object) {
            // Copy properties into the object (except for ID)
            for (let key in edits) {
                if (key !== 'id') {
                    object[key] = edits[key];
                }
            }
            return object;
        }
        return object;
    }

    delete(id: number) {
        let index = this.getIndexById(id);
        if (isDefined(index)) {
            this.objects.splice(index, 1);
            return true;
        }
        return false;
    }

    // Utility functions to find objects
    private getObjectById(id: number): T {
        for (let i=0; i < this.objects.length; i++) {
            if (this.objects[i].id === id) {
                return this.objects[i];
            }
        }
        return null;
    }
    private getIndexById(id: number): number {
        for (let i=0; i < this.objects.length; i++) {
            if (this.objects[i].id === id) {
                return i;
            }
        }
        return null;
    }
}

const usersFakeDb = new FakeDbModel<User>([
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
const oneDayAgo = new Date().getTime() - 1000*60*60*24;
const twoDaysAgo = new Date().getTime() - 1000*60*60*48;
const threeDaysAgo = new Date().getTime() - 1000*60*60*72;
const todosFakeDb = new FakeDbModel<ToDo>([
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
])

// --------------------------------- Begin server

declare var require;
const PORT = 4000;

let express = require('express');
let bodyParser = require('body-parser');
let app = express();

// Listen on port 4000
let server = app.listen(PORT, () => {
    console.info('Listening on *:' + PORT);
});

// Set up body parsing to get details from request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Allow cross origin requests for the purposes of
// using npm start to keep compiling typescript
// Not acceptable for prod servers!
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// --------------------------------- Simple Routing using Express
const usersUrl = '/users';
const todosUrl = '/todos';

// ------------------- Users
let router = express.Router();
router.get('/', (req, res) => {
    res.status(200).json(usersFakeDb.getAll());
});
router.get('/:id', (req, res) => {
    const id = +req.params.id;
    const user = usersFakeDb.get(id);
    if (!user) {
        res.status(400).json({
            'message': 'no such user'
        });
    } else {
        res.status(200).json(user);
    }
});
router.patch('/:id', (req, res) => {
    let id = +req.params.id;
    let properties = req.body.properties;
    if (!isDefined(id) || !isDefined(properties)) {
        res.status(400).json({
            'message': 'id and properties required'
        })
    } else {
        const user = usersFakeDb.edit(id, properties);
        if (!user) {
            res.status(400).json({
                'message': 'No such todo'
            });
        } else {
            // Edit success
            res.status(200).json({
                todo: user
            });
        }
    }
});
router.post('/', (req, res) => {
    let properties = req.body.properties;
    if (!isDefined(properties)) {
        res.status(400).json({
            'message': 'properties required on body'
        })
    } else {
        const user = usersFakeDb.add(properties);
        if (!user) {
            res.status(400).json({
                'message': 'properties required and properties must not contain ID'
            });
        } else {
            // Add success
            res.status(200).json(user);
        }
    }
});
router.delete('/:id', (req, res) => {
    let id = +req.params.id;
    if (!isDefined(id)) {
        res.status(400).json({
            'message': 'id required'
        })
    } else {
        if (!usersFakeDb.delete(id)) {
            res.status(400).json({
                'message': 'No such user'
            });
        } else {
            // Edit success
            res.sendStatus(200);
        }
    }
});
app.use(usersUrl, router);


// ------------------- ToDos
router = express.Router();
router.get('/', (req, res) => {
    res.status(200).json(todosFakeDb.getAll());
});
router.get('/:id', (req, res) => {
    const id = +req.params.id;
    const todo = todosFakeDb.get(id);
    if (!todo) {
        res.status(400).json({
            'message': 'no such todo'
        });
    } else {
        res.status(200).json(todo);
    }
})
router.patch('/:id', (req, res) => {
    let id = +req.params.id;
    let properties = req.body.properties;
    if (!isDefined(id) || !isDefined(properties)) {
        res.status(400).json({
            'message': 'id and properties required'
        })
    } else {
        const todo = todosFakeDb.edit(id, properties);
        if (!todo) {
            res.status(400).json({
                'message': 'No such todo'
            });
        } else {
            // Edit success
            res.status(200).json({
                todo: todo
            });
        }
    }
});
router.post('/', (req, res) => {
    let properties = req.body.properties;
    if (!isDefined(properties)) {
        res.status(400).json({
            'message': 'properties required on body'
        })
    } else {
        const todo = todosFakeDb.add(properties);
        if (!todo) {
            res.status(400).json({
                'message': 'properties required and properties must not contain ID'
            });
        } else {
            // Add success
            res.status(200).json(todo);
        }
    }
});
router.delete('/:id', (req, res) => {
    let id = +req.params.id;
    if (!isDefined(id)) {
        res.status(400).json({
            'message': 'id required'
        })
    } else {
        if (!todosFakeDb.delete(id)) {
            res.status(400).json({
                'message': 'No such todo'
            });
        } else {
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

















