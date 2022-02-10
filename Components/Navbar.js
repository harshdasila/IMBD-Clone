import React from 'react';
import Movies from '../Movies.png'
import {Link} from 'react-router-dom'

function Navbar() {
  return <>
  <div className='border pl-8 flex space-x-6 py-3 items-center'>
     <img className='w-[50px] md:w-[80px]' src={Movies} alt="" />
      <Link to="/" className='text-blue-400 font-bold text-xl md:text-3xl'>Movies</Link>
      <Link to="/favourites" className='text-blue-400 font-bold text-xl md:text-3xl'>Favourites</Link>
  </div>;
  </>
}

export default Navbar;
