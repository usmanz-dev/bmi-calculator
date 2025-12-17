import React, { useState } from 'react'

const App = () => {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [bmi, setBmi] = useState(null)
  const [message, setMessage] = useState('')

  const calcBmi = (e) => {
    e.preventDefault()

    const w = parseFloat(weight)
    const h = height.toString()

    if (!w || !h) {
      alert('Please enter valid values')
      return
    }

    // Split height like 5.8 → feet=5, inches=8
    const [feet, inches = 0] = h.split('.')
    const totalInches = (parseInt(feet) * 12) + parseInt(inches)

    const bmiValue = (w / (totalInches * totalInches)) * 703
    setBmi(bmiValue.toFixed(1))

    if (bmiValue < 18.5) {
      setMessage('You are underweight')
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setMessage('You are healthy')
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setMessage('You are overweight')
    } else {
      setMessage('You are obese')
    }
  }

  const reload = () => {
    setWeight('')
    setHeight('')
    setBmi(null)
    setMessage('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-700 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">BMI Calculator</h1>

        <form onSubmit={calcBmi} className="space-y-5">
          <input
            type="number"
            placeholder="Weight (lbs) e.g. 150"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="text"
            placeholder="Height (feet.inches) e.g. 5.8"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <div className="flex gap-3">
            <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg">
              Calculate
            </button>
            <button
              type="button"
              onClick={reload}
              className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>
        </form>

        {bmi && (
          <div className="mt-6 text-center bg-gray-50 p-4 rounded-xl">
            <h3 className="text-lg font-semibold">Your BMI</h3>
            <p className="text-3xl font-bold text-indigo-600">{bmi}</p>
            <p className="mt-1">{message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
