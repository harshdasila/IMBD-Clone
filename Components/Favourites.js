import React,{useEffect, useState} from "react";
import Pagination from "./Pagination";

function Favourites()
{
  const [rating, setRating] = useState(0);
  const [popularity, setPopularity] = useState(0);
    const [genres, setGenres] = useState([]);
    const [Favourites,setFavourites] = useState([])
    const [curGenre, setCurGenre] = useState('All Genres');
    const [search, setSearch] = useState('');
    const [rows, setRows] = useState(5);
    const [currPage, setCurrPage] = useState(1);

    //for button 
    useEffect(()=>{
        let temp = Favourites.map((movie)=>genereids[movie.genre_ids[0]])
        temp= new Set(temp)
        setGenres(["All Genres",...temp])
    },[Favourites])

    //for local storage
    useEffect(()=>{
      let oldFav = localStorage.getItem("imdb");
      oldFav = JSON.parse(oldFav)
      setFavourites([...oldFav])
    },[])
    let del =(movie)=>{
      let newArray= Favourites.filter((m)=>m.id!==movie.id)
      setFavourites([...newArray])
      localStorage.setItem("imdb",JSON.stringify(newArray))
      
  
    }

    let genereids= {
      28:"Action",12:'Adventure',16:'Animation ',35:'Comedy', 80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'
    }
     
      
    let filteredMovies=[]
    filteredMovies = curGenre ==="All Genres"? Favourites :
    Favourites.filter((movie)=>genereids[movie.genre_ids[0]]===curGenre)

    //sorting

    //rating
    if(rating===1){
      filteredMovies = filteredMovies.sort(function(objA,objB){
        return objA.vote_average - objB.vote_average
      })

    }
    else if(rating===-1)
    {
      filteredMovies = filteredMovies.sort(function(objA,objB){
        return objB.vote_average - objA.vote_average
      })
    }

    //popularity
    if(popularity===1)
    {
      filteredMovies = filteredMovies.sort(function(objA,objB){
        return objA.vote_average - objB.vote_average
      })
    }
    else if(popularity===-1)
    {
      filteredMovies = filteredMovies.sort(function(objA,objB){
        return objB.vote_average - objA.vote_average
      })
    }


    //searching

    filteredMovies =filteredMovies.filter((movie)=>movie.title.toLowerCase().includes(search.toLowerCase()));

    //pagination

    let maxpage = Math.ceil(filteredMovies.length/rows);
    let si = (currPage-1)*rows;
    let ei= Number(si)+Number(rows) 
    filteredMovies = filteredMovies.slice(si,ei);

    let goBack =()=>{
      if(currPage>1)
      {
        setCurrPage(currPage-1)
      }
    }
    let goAhead=()=>{
      if(currPage<maxpage)
      {
        setCurrPage(currPage+1);
      }
    }


    return <>
    <div className='px-2 flex justify-center flex-wrap space-x-2 mt-4'>
      {
        genres.map((genre)=>
        <button className={
          curGenre === genre ?
          "m-2 text-lg p-1 bg-blue-400 px-2 text-white rounded-xl font-bold":
          "m-2 text-lg p-1 bg-gray-400 hover:bg-blue-400 px-2 text-white rounded-xl font-bold"
      }
      onClick={()=>{
        setCurGenre(genre)
        setCurrPage(1)
      }}
      >
          {genre}
      </button>)
      }
        
        {/* <button className={
            curGenre === "Action" ?
            "m-2 text-lg p-1 bg-blue-400 px-2 text-white rounded-xl font-bold":
            "m-2 text-lg p-1 bg-gray-400 hover:bg-blue-400 px-2 text-white rounded-xl font-bold"
        }>
            Action
        </button> */}
        </div>
        <div className="text-center">
            <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder='Search' className="border border-3 text-center p-1 m-2"/>
            <input type="number" value={rows} onChange={(e)=>setRows} placeholder='Rows' className="border border-3 text-center p-1 m-2"/>
        </div>
        <div>
        <div className="flex flex-col m-4 ">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 min-w-full">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex">
                    <img src="https://img.icons8.com/pastel-glyph/50/000000/circled-up.png"alt="" className="mr-2 cursor-pointer h-[30px]"
                    onClick={()=>{
                      setRating(-1)
                      setPopularity(0)
                      }}
                      />
                    Rating
                    <img src="https://img.icons8.com/pastel-glyph/50/000000/circled-down.png"alt="" className="ml-2 mr-2 cursor-pointer h-[30px]"
                    onClick={()=>{
                      setRating(1)
                      setPopularity(0)
                    }
                    }
                    />

                    </div>
                    
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex">
                    <img src="https://img.icons8.com/pastel-glyph/50/000000/circled-up.png"alt="" className="mr-2 cursor-pointer h-[30px]"
                    onClick={()=>{
                      setPopularity(-1)
                      setRating(0)
                    }}
                    />
                    Popularity
                    <img src="https://img.icons8.com/pastel-glyph/50/000000/circled-down.png"alt="" className="ml-2 mr-2 cursor-pointer h-[30px]"
                    onClick={()=>{
                      setPopularity(1)
                      setRating(0)
                    }}
                    />
                    </div>
                    
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Genre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMovies.map((movie) => (
                   <tr key={movie.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 md:h-[100px] md:w-[180px]">
                          <img className="hidden md:block md:h-[100px] md:w-[180px] " src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 font-bold">{movie.title}</div>
                        
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{movie.vote_average}</div>
                      {/* <div className="text-sm text-gray-500">{movie.department}</div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold  ">
                      {movie.popularity}
                      </span>
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500 ">{genereids[movie.genre_ids[0]]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button href="/" className="text-red-600 hover:text-red-900"
                      onClick={()=>del(movie)}
                
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))} 
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
        </div>
        
    
    {/* <div>Input container</div>
    <div>Table Container</div>
    <div>Pagination</div> */}
    <div className="mt-4">
    <Pagination pageProp={currPage} goBack={goBack} goAhead={goAhead}/>
    </div>
    
  </>         
}
export default Favourites;