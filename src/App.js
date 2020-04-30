import React, {useState, useEffect} from 'react';
import './styles.css'
//letras maiusculas para componentes e minusculas para elementos
//Voltas
import MostraVoltas from './MostraVoltas'
// Mostrar tempo
import MostraTempo from './MostraTempo'
//Botões
import Button from './Button'

function App() {
  const [numVoltas, setNumVoltas] = useState (0)
  const [running, setRunning] = useState(false) // verificar se o contador está a contar
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
    if (numVoltas > 0) //nao permitir voltas negativas
    setNumVoltas(numVoltas - 1)
   //console.log('decrement')
  }
  const reset = () => {
    setNumVoltas (0)
    setTempo (0)
  }
  return (
    <div>
      <MostraVoltas voltas={numVoltas} />
      <Button text='+' className='bigger' onClick={increment} />
      <Button text='-' className='bigger' onClick={decrement} />
      {
        numVoltas > 0 && // só mostra tempo se o número de voltas > 0
        <MostraTempo tempo = {Math.round(tempo/numVoltas)} />
      }
      
      <Button onClick = {toggleRunning} text={running ? 'Parar' : 'Iniciar'} />
      <Button onclick = {reset} text='Reiniciar' />
    </div>
  )
}

export default App
