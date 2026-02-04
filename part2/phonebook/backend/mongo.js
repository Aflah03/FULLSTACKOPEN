const mongoose  = require('mongoose')

const URI = `mongodb+srv://aflah03:P4J2ovpFkQ8QDEIL@cluster0.np1flqc.mongodb.net/phonebook?appName=Cluster0`


mongoose.connect(URI, {family: 4})
console.log(`legnth is ${process.argv.length}, the cmd line args are ${process.argv[1]}` );


const phonebookSchema = new mongoose.Schema({
    name: String,
    number: String
})

mongoose.set('strictQuery', false)


const Person = mongoose.model('Person', phonebookSchema, 'persons')

// const person = new Person({
//     name:"Aflah Muhammed ",
//     number: "2190321"
// })


if(process.argv[2] && process.argv[3]){
    const person = new Person({
        name:`${process.argv[2]}`,
        number:`${process.argv[3]}`
    })
    person.save().then(result=>{
        console.log(result);
        console.log('item added to phonebook');
        
       mongoose.connection.close() 
    })
}else{
    console.log(`phonebook:\n`);
    
    Person.find({}).then(result =>{
        result.forEach(note =>{
            console.log(`${note.name} ${note.number}`);
            console.log();
            
            
        })
        mongoose.connection.close()
    })

}
module.exports = Person