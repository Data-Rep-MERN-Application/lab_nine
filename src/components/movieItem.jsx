import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const MovieItem = (props) => {

const handleDelete = (e) => {
    e.preventDefault();
    axios.delete('http://localhost:3000/api/movies/'+props.mymovie._id)
    .then((res)=>{
        console.log(res.data);
        props.Reload();
        alert('Movie'+props.mymovie.title+ 'Deleted');
    })
    .catch();
}

    return (
        <div>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>{props.mymovie.title}</Card.Title>
                    <img src={props.mymovie.poster} />
                </Card.Body>
                <Card.Footer className="text-muted">{props.mymovie.year}</Card.Footer>
                <Link className='btn btn-primary' to={"/edit/"+props.mymovie._id}>Edit</Link>
                <Button variant='danger' onClick={handleDelete}>Delete</Button>
            </Card>
        </div>
    );
}
export default MovieItem;