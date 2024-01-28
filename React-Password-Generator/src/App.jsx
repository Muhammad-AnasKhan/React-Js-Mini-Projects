import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(10)
  const [numberAllowed, setNumberAllowed] = useState(true)
  const [charAllowed, setCharAllowed] = useState(true)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let pwd = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed) {
      console.log('numberAllowed', numberAllowed)
      str += "1234567890"
    }
    if (charAllowed) {
      console.log('charAllowed', charAllowed)
      str += "~!@#$%^&*()_+<>?,./"
    }

    for (let index = 0; index < length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pwd += str.charAt(char)

    }
    setPassword(pwd)

  }, [length, numberAllowed, charAllowed])


  const copyPassToClipBoard = ()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  useEffect(() => {

    passwordGenerator()

  }, [length, numberAllowed, charAllowed, passwordGenerator])


  return (
    <>
      <div className='bg-blue-300 h-screen flex'>
        <div className='bg-orange-400 w-full mx-auto max-w-xl px-5 py-5 rounded-md my-auto mt-8 shadow-zinc-800 shadow-lg'>

          <h1 className='pb-4 text-4xl font-bold text-black'>ReactJS Password Generator</h1>
          <div className='flex mb-3'>
            <input ref={passwordRef} value={password} className='py-3 rounded-lg outline-none px-2 rounded-r-none w-full' type="text" onChange={()=>{}} />
            <button onClick={copyPassToClipBoard} className='bg-blue-600 rounded-lg py-2 px-4 text-white rounded-l-none'>Copy</button>

          </div>
          <div>
            Length: {length}
            <input className='w-full text-black cursor-pointer' value={length} type="range" min='10' max='50' name="length" onChange={(e) => { setLength(e.target.value) }} />
          </div>
          <div>
            Numbers                                                                                                  
            <input className='mx-2' checked={numberAllowed} type="checkbox" name="numberAllowed" id="" onChange={(e) => { setNumberAllowed((prev) => !prev) }} />

          </div>
          Special characters
          <input className='mx-2 w-5' checked={charAllowed} type="checkbox" name="" id="" onChange={(e) => { setCharAllowed((prev) => !prev ) }} />


        </div>

      </div>
    </>
  )
}

export default App
