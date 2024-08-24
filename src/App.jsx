import { useState , useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [num , setNum] = useState(false);
  const [char , setChar] = useState(false);
  const [ password , setPassword] = useState("");
// use ref hook
  const passwordRef = useRef(null);

  const copyPassword = useCallback( () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0 , 50);
    window.navigator.clipboard.writeText(password)
  }, [password])
  const passwordGenerator = useCallback(() =>{
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";
    if(num) string += "0123456789"
    if(char) string += "!@#$%&*"

    for (let i = 0; i <= length; i++) {
      const char = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(char)
    }
    
    setPassword(pass)
  } , [length , num , char , setPassword])
  useEffect(()=> {
    passwordGenerator()
  }, [length, num , char ])

  return (
    <>
     <div className='w-full max-w-md rounded-lg px-4 py-4  bg-gray-700 text-white text-center mx-auto'>
      <h1 className='text-center text-white'>Password Generator</h1>
      <div className='flex rounded-lg overflow-hidden mb-4 mt-4'>
        <input 
        type="text"
        value={password}
        className='outline-none w-full py-1 px-3 text-black'
        placeholder='Password'
        readOnly
        useRef = {passwordRef}
        />
        <button  onClick={copyPassword} className='bg-orange-600 p-4 text-lg'>Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={8}
          max={50}
          value={length}
          className='cursor-pointer'  
          onChange={(e) => {setLength(e.target.value)}}    
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked = {num}
          id='numberInput'
          onChange={() =>{
            setNum((prev) => !prev)
          }}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox"
          defaultChecked = {char}
          id='charInput'
          onChange={() =>{
            setChar((prev) => !prev);
          }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>


       </div>
    </>
  )
}

export default App
