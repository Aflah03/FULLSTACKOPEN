const Header = ({course})=>{
  return (
    <>
      <h1>{course}</h1>
    </>

  )
}

const Part = ({part, exercises})=>{
  return (
    <>
    <p>
      {part} {exercises}
    </p>
    </>
  )
}

const Content  = ({parts})=>{
  return (
  <>
      {parts.map(part =>{
        return  <Part part={part.name} exercises={part.exercises} key={part.id}/> 
      })}
  </>)
}


const Total = ({parts})=>{
 console.log(parts);
  
  return (
    <>
      <h3> total of excercies is {parts.reduce((accumulator, cuurValue)=>{
        return accumulator+cuurValue.exercises;
      },0)}</h3>
      
    </>
  )
}

const Course = ({course})=>{
    return (
        <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
        </div>
    )
}

export default Course