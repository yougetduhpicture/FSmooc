require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const path = require('path');
const Person = require('./models/person');


app.use(express.json());
app.use(cors());
  
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





app.use(express.static(path.join(__dirname, 'build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
  });

  app.get('/info', (req, res) => {
    const date = new Date()
    date.getDate()

    res.send(`<p>Phonebook has info for ${persons.length} people</p><br><p>${date}</p>`)
  })
  
  app.get('/api/people', (req, res) => {
    console.log('Getting people')
    Person.find({}).then(people => {
      res.json(people)
    })
  })



  app.get('/api/people/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
      response.json(person)
    })
    
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

  app.post('/api/people', (request, response) => {
    const body = request.body;
    console.log(body.content)
    if (!body.name || !body.number) {
      return response.status(400).json({ error: 'content missing' })
    }  

  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    console.log('saving a person')
    response.json(savedPerson)
  })
  /**if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing, fill in the both fields' 
    })
  } else if(people.some((person) => person.name === body.name)){
    return response.status(400).json({ 
        error: 'Make sure to use a unique name' 
    })
  }**/
    
    //people = people.concat(person)
    //response.json(person)
  })

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })