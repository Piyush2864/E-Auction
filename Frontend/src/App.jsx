import './App.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './component/Login';
import SignupPage from './component/Signup';


function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
