import { useEffect, useState } from "react";
import axios from 'axios';
import Movies from "./movies";
const Read = () => {
    const [myMovies, setMovie] = useState([]);

    useEffect(
        () => {
            //do some http client work
            axios.get('http://localhost:3000/api/movies',{
                headers: {
                    'X-Martin-Header': 'some value',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    console.log(response.data.myArray);
                    setMovie(response.data.myArray);
                })
                .catch((error) => { console.log(error) });
        }, []
    );

    
    return (
        <div>
            <h1>Hello from Read component</h1>
            <Movies myMovies={myMovies}></Movies>
        </div>
    );
}

export default Read;