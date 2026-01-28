const Hello = (props)=>{
  console.log(props);
  
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}
const App = ()=>{
  const name  = "Jumana"
  const age  = 20
  return (
    <div>
      <p>Hello world</p>
      <Hello name="Aflah"/>
      <Hello name={name} age={age}/>
      <Hello age={10}/>

    </div>
  )
}

export default App