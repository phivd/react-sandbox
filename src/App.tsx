import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <div className='App-header'>
        <nav>
          <Link to="/weather" className='App-link'>Weather</Link>
          <Link to="/login" className='App-link'>Login</Link>
        </nav>
      </div>
      <div className='App-body'>
        <Routes>
          <Route path="/weather" element={<WeatherPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
