import React, {useState, useEffect} from 'react';
//letras maiusculas para componentes e minusculas para elementos
//Voltas
const MostraVoltas = (props) => {
  return(
    <p>
      {props.voltas}<br/>
      Voltas
    </p>
  )
}
// Mostrar tempo
const MostraTempo = (props) =>{
  const tempo = props.tempo
  const minutos = Math.ceil (tempo / 60)// passar inteiro em minutos
  const segundos = tempo % 60 // resto da disivao por minutos
  return (
    <p>
      {'${minutos}:${segundos}'}<br/>
      Tempo médio por volta
  </p>
  )
}
//Botões
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

function App() {
  const [numVoltas, setNumVoltas] = useState (14)
  const [running, setRunning] = useState(false)
  const toggleRunning = () => {
    setRunning(!running) //inverte o valor de running
  }
  
  const [tempo, setTempo] = useState(0)
  useEffect(()=>{
    let timer = null
    if (running) { 
      timer = setInterval (() => {
        setTempo(old => old + 1) //valor anterior + 1
        //console.log('chamou!')
      },1000)
    }
    return () => {
      if (timer) { //truthy valor que é convertido para verdadeiro
        clearInterval(timer)
      }
    }
  }, [running])// funciona so uma vez

  const increment = () => {
    setNumVoltas(numVoltas + 1)
   // console.log('increment')
  }
  const decrement = () => {
    setNumVoltas(numVoltas - 1)
   //console.log('decrement')
  }

  return (
    <div>
      <MostraVoltas voltas={numVoltas} />
      <Button text='+' onClick={increment} />
      <Button text='-' onClick={decrement} />
      <MostraTempo tempo = {tempo} />
      <Button onClick = {toggleRunning} text='Iniciar' />
      <Button text='Reiniciar' />
    </div>
  )
}

export default App
