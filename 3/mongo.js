const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://rzmz:${password}@cluster0.pjvq3.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Person = mongoose.model('Person', phoneBookSchema)

const person = new Person({
  content: 'HTML is easy',
  important: true,
})

person.save().then(result => {
  console.log('person saved!')
//mongoose.connection.close()
})
Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})