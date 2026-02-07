
const mongoose = require('mongoose')

// console.log(`legnth is ${process.argv.length}, the cmd line args are ${process.argv[1]}` );


const phonebookSchema = new mongoose.Schema({
	name: String,
	number: {
		type: String,
		required: true,
		minlength: 10
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref:'User'
	}
})
const Person = mongoose.model('Person', phonebookSchema, 'persons')
phonebookSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})



// const person = new Person({
//     name:"Aflah Muhammed ",
//     number: "2190321"
// })


// if(process.argv[2] && process.argv[3]){
//     const person = new Person({
//         name:`${process.argv[2]}`,
//         number:`${process.argv[3]}`
//     })
//     person.save().then(result=>{
//         console.log(result);
//         console.log('item added to phonebook');

//        mongoose.connection.close() 
//     })
// }else{
//     console.log(`phonebook:\n`);

//     Person.find({}).then(result =>{
//         result.forEach(note =>{
//             console.log(`${note.name} ${note.number}`);
//             console.log();


//         })
//         mongoose.connection.close()
//     })

// }


module.exports = Person
