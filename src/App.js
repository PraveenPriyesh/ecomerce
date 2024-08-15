import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import TextLinkExample from './components/header';
import BasicExample from './components/products';
function App() {
  
  return (
    <Router>
      <div className="App">
      <TextLinkExample/>
        <Routes>
            <Route path='/' exact element={<Login/>}/>
            <Route path='/register' exact element={<Register/>}/>
            <Route path='/products' exact element={<BasicExample/>}/>
        </Routes>
            
        
      </div>
    </Router>
  );
}

export default App;
