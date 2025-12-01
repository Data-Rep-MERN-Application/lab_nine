import { useEffect, useState } from "react";
import axios from 'axios';
import Movies from "./movies";
const Read = () => {
    const [myMovies, setMovie] = useState([]);
    const Reload = () => {
         //do some http client work
            axios.get('http://localhost:3000/api/movies')
                .then((response) => {
                    console.log(response.data.myArray);
                    setMovie(response.data.myArray);
                })
                .catch((error) => { console.log(error) });
    };
    useEffect(
        () => {
            Reload();
            }, []
    );

    
    return (
        <div>
            <h1>Hello from Read component</h1>
            <Movies myMovies={myMovies} Reload={Reload}></Movies>
        </div>
    );
}

export default Read;