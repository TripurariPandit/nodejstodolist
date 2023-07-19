const express = require('express');
const path = require('path');
const port = 8000;

// For connecting the database (monogodb)
const db = require('./config/mongoose');
const Todo = require('./models/todo');

const app = express();

// Setting for views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MiddleWare use as body parser
app.use(express.urlencoded());

// Middleware to serve static file like css js images
app.use(express.static('assets'));

app.get('/', function (req, res) {
    // Fetching contact from the database
    Todo.find({})
        .then(todo => {
            // To formate date 
            const newTodo = todo;
            newTodo .forEach((newDate) => {
                const date = new Date(newDate.duedate);
                newDate.formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
            })
            return res.render('home', {
                title: 'Contact list',
                todo_list: newTodo ,
            });
        })
        .catch(err => {
            console.log(`Error in fetching contacts from db ${err}`);
        });
});

app.post('/create-todo', function (req, res) {
    // Populating the database
    Todo.create({
        description: req.body.desclist,
        category: req.body.category,
        duedate: req.body.duedate
    })
        .then((newTodo) => {
            return res.redirect('back');
        }).catch((err) => {
            console.log('Error is creating a contact', err);
        });
});

app.get('/delete-todo/', function (req, res) {
    // get the id query from query in the url
    let id = req.query.id;
    // Find the contact in the database using id and delete the contect
    Todo.findByIdAndDelete(id)
        .then(() => {
            return res.redirect('back');
        })
        .catch(err => {
            console.log(`error in deleting an object from database ${err}`);
        });
});

app.listen(port, function (err) {
    if (err) {
        console.log(`Error: ${err}`);
        return;
    }
    console.log(`Server is running on the port: ${port}`);
});