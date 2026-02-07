const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.json())
const Person = require('./models/person')
const logger = require('./utils/logger')
app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})


// Person.find({}).then(result=>{
// 	console.log(result);
// })
const requestLogger = (req, res, next) => {
	console.log('Method: ', req.method);
	console.log('Path: ', req.path);
	console.log(' body: ', req.body);
	console.log('---------------');
	next()
}
// app.use(requestLogger)
// app.use(morgan('tiny'))
// app.use(morgan(function(tokens, req, res) {
// 	return [
// 		tokens.method(req, res),
// 		tokens.url(req, res),
// 		tokens.status(req, res),
// 		tokens.res(req, res, 'content-length'), '-',
// 		tokens['response-time'](req, res), 'ms'
// 	].join(' ')
// }))


app.get('/api/persons', (req, res) => {
	Person.find({}).then(result=>{
		console.log(result);
		res.json(result)
	})
})
// app.get('/api/persons/:id', (req, res, next) => {
//   const id = req.params.id

//   Person.findById(id)
//     .then(result => {
//       if (result) {
//         res.json(result)
//       } else {
//         res.status(404).json({ error: 'person not found' })
//       }
//     })
//     .catch(error => {
//       if (error.name === 'CastError') {
//         res.status(400).json({ error: 'malformatted id' })
//       } else {
//         next(error)
//       }
//     })
// })
//move all eror handlers to one place using next(error)
//when next is called with a parameter excetion is handed over to error handler middleware
// if called without a paramter execution moves to next route or middleware

app.get('/api/persons/:id', (req, res,next) => {
	const id = req.params.id
	Person.findById(id).then(result =>{
		if(result){
			console.log(`got back : ${result}`);
			res.json(result)	
		}else{
			res.status(404).json('not found')
			console.log('is this block begin executed');
			

		}
	}).catch(error=>{
		next(error)	
		//calls the error handler middlware we defiend ealrier
	})
})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id
	Person.findByIdAndDelete(id).then(deltedUser=>{
		if(!deltedUser){
			return res.status(400).send('user not found')
		}
		res.json(deltedUser)
	})
	// persons = persons.filter((person) => person.id !== id)
	// res.sendStatus(202)
})

app.get('/info', (req, res) => {
	const date = new Date()
	Person.find({}).then(persons=>{
		res.send(`<p>Phonebook has ${persons.length} people </p> 
			<p>${date}</p>`)
	})
})

app.post('/api/persons/', (req, res) => {
	if(req.body.name && req.body.number ){
		// Person.findOne({name: req.body.name}).then(result=>{
		// 	console.log(`a person already exist with this name`);
		// 	console.log(`result is ${result}`);
		// 	res.status(400).json('cannot add dup names')
		// })
		// right now we handle duplicates from forntend
		// if we have duplicate name we send it to put request
		// from the frontedn
		const person = new Person({
			name: req.body.name,
			number: req.body.number
		})
		person.save().then(result=>{
			console.log('saved data to bd');
			console.log(result);
			
			res.json(result)
			
		})
	}else{
		//name or number not provided
		res.status(400).json('please fill in both fields');
	}
})
//when modifying number of contacts that already exist
app.put('/api/persons/:id', (req, res) => {
	const id = req.params.id
	const {name, number}  = req.body
	Person.findById(id)
	.then(person=>{
		if(!person){
			return res.status(404).end()
		}
		person.name = name
		person.number = number

		return person.save().then(updatedNote=>{
			res.json(updatedNote)
		})
	})
	.catch(error=> next(error))
})


const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endponit' })
}
const errorHanlder = (error, request, response, next)=>{
	console.log(error.message)
	
	if(error.name == 'CastError'){
		return response.status(400).send({error: 'malforamtted id'})
	}
	next(error) //if its not cast Eroror next error middlware is callied
	//if we havent defined any , the built in error handler will handle it
}
app.use(unknownEndpoint)
app.use(errorHanlder)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	logger.info('app listening on port 3001');
})
