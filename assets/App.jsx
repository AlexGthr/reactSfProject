import { useState } from 'react'
import reactLogo from './react.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/home"
import Profil from "./pages/Profil"

function App() {
  const [count, setCount] = useState(0)

  return (
    // <div className="App">
    //   <div>
    //     <a href="https://reactjs.org" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>assets/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </div>

    <BrowserRouter>
        <Routes>
            <Route path="/Home" element={ <Home/> } />
            <Route path="/Profil" element= { <Profil/> } />
        </Routes>
    </BrowserRouter>
  )
}

export default App