const mongoose = require('mongoose')

let newName
let newNumber

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstack-backend.qxoct.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  newName = process.argv[3]
  newNumber = process.argv[4]

  mongoose.connect(url)
  .then((result) => {
    console.log('connected')

    if (newName && newNumber) {
      const newPerson = new Person({
        name: newName,
        number: newNumber
      })

      return newPerson.save()
    }
  })
  .then(() => {
    console.log('operation complete')
    return mongoose.connection.close()
  })
  .catch(err => console.log(err))
} else {
  mongoose.connect(url)
    .then((result) => {
      console.log('connected')

      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
    })
}