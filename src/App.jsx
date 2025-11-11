import { Route, Routes } from 'react-router-dom'
import './App.css'
import Lock from './Lock'
import Desktop from './Destktop'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Lock />}> </Route>
      <Route path='/destktop' element={<Desktop />}> </Route>
    </Routes>
  )
}

export default App
