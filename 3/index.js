const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
  
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(
  
  function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ')
}))

let persons = [
    {
      id: 1,
      name: "Arto Hellas",
      number: "040-123456"
    },
    {
      id: 2,
      name: "Ada Lovelace",
      number: "39-44-5323423"
    },
    {
      id: 3,
      name: "Dan Abramov",
      number: "12-43-234345"
    },
    {
      id: 4,
      name: "Leonor",
      number: "098765432"
    },
  ]

  app.get('/info', (req, res) => {
    const date = new Date()
    date.getDate()

    res.send(`<p>Phonebook has info for ${persons.length} people</p><br><p>${date}</p>`)
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (!person) {
        return response.status(404).json({ 
          error: 'content not found' 
        })
      } else{
    response.json(person)
      }

  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
  
    response.status(204).end()
  })
  
  const generateId = () => {
    function getRandomInt(min, max) {
      min = Math.ceil(1000000);
      max = Math.floor(9999999);
      return Math.floor(Math.random() * (max - min) + min);
    }
    return getRandomInt()
  }

  app.post('/api/persons', (request, response) => {
    const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing, fill in the both fields' 
    })
  } else if(persons.some((person) => person.name === body.name)){
    return response.status(400).json({ 
        error: 'Make sure to use a unique name' 
      })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)