import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
const MovieItem = (props) => {
    return (
        <div>
            <Card className="text-center">

            
            
                <Card.Body>
                    <Card.Title>{props.mymovie.title}</Card.Title>
                    <img src={props.mymovie.poster} />
                </Card.Body>
                <Card.Footer className="text-muted">{props.mymovie.year}</Card.Footer>
                <Link className='btn btn-primary' to={"/edit/"+props.mymovie._id}>Edit</Link>
            </Card>
        </div>
    );
}
export default MovieItem;