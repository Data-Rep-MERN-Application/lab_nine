import Movies from "./movies";
import { useEffect, useState } from "react";
import axios from "axios";

const Read = () => {

  const [movies, setMovies] = useState([]);

  const ReloadData = ()=>{
    axios.get('http://localhost:4000/api/movies')
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    ReloadData();
    
  },[]);

  return (
    <div>
      <h3>Hello from read component!</h3>
      <Movies myMovies={movies} ReloadData={ReloadData} />
    </div>
  );
}

export default Read;