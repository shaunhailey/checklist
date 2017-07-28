const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressValidator())

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

let myList = []
app.get('/', function(req, res) {
  res.render('index', { todos: myList })
})

app.post('/', (req, res) => {
  req.checkBody('newItem', 'Need an item to do!').notEmpty()
  const errors = req.validationErrors()
  if (errors) {
    res.render('index', { errors })
  } else {
    myList.push(req.body.newItem)
    res.render('index', {
      todos: myList
    })
  }
})

app.listen(3000, () => {
  console.log('Magic is happening on port 3000')
})
