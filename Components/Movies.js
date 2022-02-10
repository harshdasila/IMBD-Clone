import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { Oval } from  'react-loader-spinner'
import Pagination from './Pagination';

function Movies() {

    const [movies,setMovies]=useState([])
    const [pageNumber,setPage]= useState(1);
    const [hover, setHover] = useState('');
    const [favourites, setfavourites] = useState([]);

  function goAhead()
  {
    setPage(pageNumber+1);
  }
  function goBehind()
  {
    if(pageNumber>1)
    setPage(pageNumber-1);
  }

  let add =(movie)=>{
        let newArray =[...favourites,movie]
        setfavourites([...newArray])
        localStorage.setItem("imdb",JSON.stringify(newArray))
  }

  let del =(movie)=>{
    let newArray= favourites.filter((m)=>m.id!==movie.id)
    setfavourites([...newArray])
    localStorage.setItem("imdb",JSON.stringify(newArray))
    

  }
    useEffect(function(){ 
       
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=8b340f7ba33b5999cddf169421fd9c4f&page=${pageNumber}`).then((res)=>
        {
          setMovies(res.data.results)
          let oldFav = localStorage.getItem("imdb");
          oldFav = JSON.parse(oldFav)
          setfavourites([...oldFav])
        }
        )
    }
    ,[pageNumber])
   
    


  return <>
  <div className='mb-8'>
  <div className='mt-10 mb-10 font-bold text-3xl text-center'>Trending Movies</div>
  <div>
      {
          movies.length===0?
          <div className='flex justify-center'>
          <Oval
            heigth="100"
            width="100"
            color='grey'
            secondaryColor='grey'
            ariaLabel='loading'
        />
        </div>:
      
      <div className='flex flex-wrap justify-center '>
          {
            movies.map((movie)=>(
                
                <div className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] md:h-[30vh] md:w-[200px] h-[25vh] w-[150px]
                bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 relative`}
                    onMouseEnter={()=>{setHover(movie.id)}}
                    onMouseLeave={()=>{setHover("")}}
                    >
                    {
                        hover === movie.id && <>{
                            !favourites.find((m)=>m.id===movie.id)?
                            <div className='absolute top-2 right-2 p-1  rounded-xl text-xl cursor-pointer'
                            onClick={()=>add(movie)}>🤍</div> :
                            <div className='absolute top-2 right-2 p-1  rounded-xl text-xl cursor-pointer'
                            onClick={()=>del(movie)}>💖</div>
                        }
                        
                        
                        </>
                         
                    }
                    
                    <div className='text-white bg-gray-900 w-full py-2 text-center rounded-b-xl md:text-xl text-sm  font-bold'>{movie.title}</div>
                </div>
            ))
          }
        </div>
} 
  </div>
  </div>
  <Pagination pageProp={pageNumber} goBack={goBehind} goAhead={goAhead}/>
  </>
}

export default Movies;
