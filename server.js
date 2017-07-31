const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const session = require('express-session')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  })
)
app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

//gets the form input from the browser
app.get('/', function(req, res) {
  const todoList = req.session.todoList || []
  const templateData = {
    uncompleted: todoList.filter(todo => !todo.completed),
    completed: todoList.filter(todo => todo.completed)
  }
  res.render('index', templateData)
})

//posting the data to the browser for new todo
app.post('/addTodo', (req, res) => {
  const todoList = req.session.todoList || []
  const descriptionForNewTodo = req.body.description

  todoList.push({ id: todoList.length + 1, completed: false, description: descriptionForNewTodo })
  req.session.todoList = todoList
  res.redirect('/')
})

//posting completed todos to browser
app.post('/markComplete', (req, res) => {
  const todoList = req.session.todoList || []
  const id = parseInt(req.body.id)
  const todo = todoList.find(todo => todo.id === id)

  if (todo) {
    todo.completed = true
    req.session.todoList = todoList
  }
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Magic is happening on port 3000')
})
