import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
// import Pagination from './Components/Pagination';
import {BrowserRouter,Routes,Route}  from 'react-router-dom';
import Favourites from './Components/Favourites';


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<><Banner/> <Movies/> 
      </>}/>
      <Route path='/favourites' element={<Favourites/>}/>
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
