import { useState } from "react";

const App = ()=>{
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)


  const handLeftClick = ()=>{
    setAll(allClicks.concat('L'))
     console.log('left before', left)
    setLeft(left+1)
     console.log('left after', left)
      setTotal(left + right)
  }

  const handRightClick= ()=>{
    setAll(allClicks.concat('R'))
    setRight(right+1)
      setTotal(left + right)
  }
  return(
    <>
    {left}
    <button onClick={handLeftClick}>left</button>
    <button onClick={handRightClick}>right</button>
    {right}
    <p>{allClicks.join(' ')}</p>
    <p>total : {total}</p>
    </>
  )
}
export default App