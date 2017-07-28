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

const todos = ['Wash the car']
//QUESTION--WHAT DOES TODO:TODO ACCOMPLISH BELOW?
app.get('/', function(req, res) {
  res.render('index', { todos })
})

app.post('/', (req, res) => {
  req.checkBody('todo', 'Need an item to do!').notEmpty()
  //QUESTION--WHAT DOES ERRORS:ERRORS ACCOMPLISH BELOW?
  //QUESTION--WHY IS THE BELOW NOT RENDERING A VALID INDEX PAGE WITH TODO ITEMS?
  const errors = req.validationErrors()
  if (errors) {
    res.render('index', { errors })
  } else {
    //QUESTION--i anticipated below to provide the post data for /index, not sure why not working?
    res.render('index', {
      todo: req.body.todo
    })
  }
})

app.listen(3000, () => {
  console.log('Magic is happening on port 3000')
})
