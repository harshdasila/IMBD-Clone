import React from 'react';

function Pagination({pageProp,goAhead,goBack}) {
  
  return <>
    <div className='w-full flex justify-center mb-8'>
        <button className='p-2 border-2 border-indigo-500 border-r-0 text-indigo-500 rounded-l-xl text-lg'
        onClick={goBack} 
        >Previous</button>
        <button className='p-2 border-2 border-indigo-500 text-indigo-500 bg-gray-100 text-lg'>
          {pageProp}
          </button>
        <button className='p-2 border-2 border-indigo-500 text-indigo-500 border-l-0 rounded-r-xl text-lg'
        onClick={goAhead}
        >Next</button>
    </div>
</>;
}

export default Pagination;
