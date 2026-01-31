import { useState } from 'react'
import './Calculator.css'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false)

  const handleNumber = (num) => {
    if (shouldResetDisplay) {
      setDisplay(String(num))
      setShouldResetDisplay(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const handleDecimal = () => {
    if (shouldResetDisplay) {
      setDisplay('0.')
      setShouldResetDisplay(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleOperation = (op) => {
    const currentValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setOperation(op)
    setShouldResetDisplay(true)
  }

  const calculate = (prev, current, op) => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '×':
        return prev * current
      case '÷':
        return current !== 0 ? prev / current : 'Error'
      default:
        return current
    }
  }

  const handleEquals = () => {
    if (operation === null || previousValue === null) return

    const currentValue = parseFloat(display)
    const result = calculate(previousValue, currentValue, operation)
    
    setDisplay(String(result))
    setPreviousValue(result)
    setOperation(null)
    setShouldResetDisplay(true)
  }

  const handleAC = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setShouldResetDisplay(false)
  }

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="calculator-header">
          <h2>Calculadora</h2>
        </div>
        
        <div className="calculator-display">
          {display}
        </div>

        <div className="calculator-buttons">
          <button className="btn btn-light btn-ac" onClick={handleAC}>AC</button>
          <button className="btn btn-warning" onClick={() => handleOperation('÷')}>÷</button>
          
          <button className="btn btn-secondary" onClick={() => handleNumber(7)}>7</button>
          <button className="btn btn-secondary" onClick={() => handleNumber(8)}>8</button>
          <button className="btn btn-secondary" onClick={() => handleNumber(9)}>9</button>
          <button className="btn btn-warning" onClick={() => handleOperation('×')}>×</button>
          
          <button className="btn btn-secondary" onClick={() => handleNumber(4)}>4</button>
          <button className="btn btn-secondary" onClick={() => handleNumber(5)}>5</button>
          <button className="btn btn-secondary" onClick={() => handleNumber(6)}>6</button>
          <button className="btn btn-warning" onClick={() => handleOperation('-')}>-</button>
          
          <button className="btn btn-secondary" onClick={() => handleNumber(1)}>1</button>
          <button className="btn btn-secondary" onClick={() => handleNumber(2)}>2</button>
          <button className="btn btn-secondary" onClick={() => handleNumber(3)}>3</button>
          <button className="btn btn-warning" onClick={() => handleOperation('+')}>+</button>
          
          <button className="btn btn-secondary btn-zero" onClick={() => handleNumber(0)}>0</button>
          <button className="btn btn-secondary" onClick={handleDecimal}>.</button>
          <button className="btn btn-warning btn-equals" onClick={handleEquals}>=</button>
        </div>
      </div>
    </div>
  )
}

export default Calculator
