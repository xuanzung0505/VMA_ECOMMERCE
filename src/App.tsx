import './styles.css'
import IMAGE from './react.png'
import { useState } from 'react'
// import * as dotenv from 'dotenv'

// dotenv.config()

export const App = () => {
  const [count, setCount] = useState(0)
  const name = 'hehe'

  return (
    <>
      <h1>App.tsx</h1>
      <img src={IMAGE} alt="react logo" width="300" height="200"></img>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        Button {count}
      </button>
    </>
  )
}
