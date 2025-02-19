# Lab 9: MERN Delete ----  Data Representation and Querying
aaaaaaaaahello world This lab provides step-by-step guidance on adding **delete functionality** to a MERN (MongoDB, Express.js, React, Node.js) application for managing movies.

---

## Objectives

1. Implement delete functionality in the **React frontend** and **Node.js backend**.
2. Automatically refresh the movie list upon successful deletion.
3. Commit and push your work to GitHub after completing each exercise.

---
asdfasdfasdfsdfgsdfdssdfgsdfsssssssssasdfaaaaaaaaaasss
## Instructions

### 1. Set Up the Application

- If you completed Lab 8, continue with your existing project.
- If not, clone the Lab 8 solution repository from GitHub:

```bash
git clone https://github.com/Data-Rep-MERN-Application/lab_eight
cd lab_eight
npm install
```

Ensure your server and frontend are running.

---

### 2. Add Delete Functionality

#### React Changes

- **Modify `movieItem.js`** to include a delete button for each movie:

```javascript
import axios from "axios";
import Button from 'react-bootstrap/Button';

function MovieItem(props) {
    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete('http://localhost:4000/api/movie/' + props.myMovie._id)
            .then(() => {
                props.Reload(); // Refresh the movie list after deletion
            })
            .catch((error) => {
                console.error("Error deleting movie:", error);
            });
    };

    return (
        <div>
            {/* Other movie details */}
            <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
    );
}

export default MovieItem;
```

#### Server Changes

- **Update `server.js`** to handle DELETE requests:

```javascript
app.delete('/api/movie/:id', async (req, res) => {
  
        console.log('Deleting movie with ID:', req.params.id);
        const movie = await movieModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Movie deleted successfully", movie });
        
    }
});
```

---

### 3. Refresh the List After Deletion

#### React Updates

- **Modify `movies.js`** to pass the `Reload` function as a prop to `MovieItem`:

```javascript
import MovieItem from "./movieItem";

function Movies(props) {
    return (
        <>
            {props.myMovies.map((movie) => (
                <MovieItem
                    myMovie={movie}
                    key={movie._id}
                    Reload={props.ReloadData}
                />
            ))}
        </>
    );
}

export default Movies;
```

- **Update `read.js`** to handle data reloading:

```javascript
import axios from "axios";
import { useState, useEffect } from "react";
import Movies from "./movies";

function Read() {
    const [data, setData] = useState([]);

    const Reload = () => {
        console.log("Reloading movie data...");
        axios.get('http://localhost:4000/api/movies')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error("Error reloading data:", error);
            });
    };

    useEffect(() => {
        Reload();
    }, []);

    return (
        <div>
            <h2>Movie List</h2>
            <Movies myMovies={data} ReloadData={Reload} />
        </div>
    );
}

export default Read;
```

---

### Explanation of the Code (Sections 2 & 3)

#### **React Changes (`movieItem.js`)**
- Adds a delete button to each movie, sending a `DELETE` request with the movie's ID to the server.
- Refreshes the movie list by calling the `Reload` function passed down as a prop.

#### **Server Changes (`server.js`)**
- Handles `DELETE` requests by removing the specified movie from the MongoDB database.
- Sends a success or error response based on the outcome of the operation.

#### **Refresh Movie List (`movies.js` and `read.js`)**
- `movies.js`: Passes the `ReloadData` function to child components so they can trigger a refresh after deletion.
- `read.js`: Defines and manages the `Reload` function, which fetches updated movie data from the server and updates the state.

---

## Expected Behavior

1. When a user clicks the **Delete** button:
   - The movie is deleted from the MongoDB database.
   - The movie list is automatically refreshed to reflect the change.

2. Any errors during the deletion process are logged in the console.

---

By the end of this lab, your application will support deleting movies and dynamically updating the UI. Commit and push your work to GitHub after completing the implementation.