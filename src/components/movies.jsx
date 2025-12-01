import MovieItem from './movieItem';
const Movies = (props)=>{
    return props.myMovies.map(
        (movie)=>{
            return <MovieItem mymovie={movie} key={movie._id} Reload={props.Reload}></MovieItem>
        }
    );
}
export default Movies;