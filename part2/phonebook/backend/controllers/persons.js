const personsRouter = require('express').Router()
const Person = require('../models/person')
const User = require('../models/user')




personsRouter.get('/', (req, res) => {
	Person.find({}).then(result=>{
		console.log(result);
		res.json(result)
	})
})

personsRouter.get('/:id', (req, res,next) => {
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

personsRouter.delete('/:id', (req, res) => {
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

personsRouter.get("/info", (req, res) => {
	const date = new Date()
	Person.find({}).then(persons=>{
		res.send(`<p>Phonebook has ${persons.length} people </p> 
			<p>${date}</p>`)
	})
})



personsRouter.post('/',async (req, res) => {
	const user =  await User.findById(req.body.userId)
	await console.log(user);
	
	if(!user){
		return response.status(400).json({error: "userId missing or not valid"})
	}
	if(req.body.name && req.body.number ){
		const person = new Person({
			name: req.body.name,
			number: req.body.number,
			user: user._id
		})
		const savedPerson= await person.save()
		user.persons= await user.persons.concat(savedPerson._id)
		await user.save()
		res.status(201).json(savedPerson)
	}else{
		//name or number not provided
		res.status(400).json('please fill in both fields');
	}
})
//when modifying number of contacts that already exist
personsRouter.put('/:id', (req, res) => {
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

module.exports = personsRouter 