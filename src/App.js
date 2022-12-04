import {Routes,Route} from 'react-router-dom'

import Home from './components/Home'
import TeamMatches from './components/TeamMatches'
import './App.css';

function App() {
  return (
    <>
    
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route exact path="/team-matches/:id" element={<TeamMatches/>} />
      
    </Routes>
  </>
  );
}

export default App;
