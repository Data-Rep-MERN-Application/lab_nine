

# Lab 8: MERN/Update ----  Data Representation and Querying

This lab involves tasks related to updating and querying data in a MERN (MongoDB, Express.js, React, Node.js) stack application.

## Instructions

1. **Commit and push each solution to GitHub after completing an exercise.**
  

2. **React Application Setup**
   - If you haven’t completed the previous lab, clone the React application from GitHub:
     ```bash
     git clone https://github.com/Data-Rep-MERN-Application/lab_seven
     ```
   - Install project dependencies:
     ```bash
     npm install
     ```

---

3. **Add Edit Functionality**
   - Add functionality to allow users to edit movies. When a user clicks the "Edit" button, a new window will open where they can modify movie information. Use the following code to create a functional `Edit.js` component.

   - Explanation of `useParams` and `useNavigate`
   
   - **`useParams`**: This hook is provided by React Router and allows you to access the dynamic parameters of the current route. In this case, `useParams` is used to get the `id` of the movie from the URL, allowing us to retrieve the specific movie data from the database. This makes it possible to load and edit details for a single, specific movie.

   - **`useNavigate`**: This hook, also provided by React Router, returns a function that enables navigation to different routes programmatically. Here, it is used after the user submits the edited movie information. Once the update is saved, `useNavigate` is called to redirect the user back to the "read" page where they can view all movies, including the one they just edited.

   ### Client Side change
- create `edit.js` to handle editing movies.
  
   ```javascript
   
    import React from 'react';
    import { useParams } from 'react-router-dom';
    import { useState, useEffect } from 'react';
    import axios from 'axios';
    import { useNavigate } from "react-router-dom";

    export default function Edit(props) {
      let { id } = useParams();
      const [title, setTitle] = useState("");
      const [year, setYear] = useState("");
      const [poster, setPoster] = useState("");
      const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/api/movie/' + id)
            .then((response) => {
                setTitle(response.data.title);
                setYear(response.data.year);
                setPoster(response.data.poster);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newMovie = { id, title, year, poster };
        axios.put('http://localhost:4000/api/movie/' + id, newMovie)
            .then((res) => {
                console.log(res.data);
                navigate('/read');
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Movie Title: </label>
                    <input type="text" 
                    className="form-control" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Release Year: </label>
                    <input type="text" 
                    className="form-control" 
                    value={year} 
                    onChange={(e) => setYear(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Poster URL: </label>
                    <input type="text" 
                    className="form-control" 
                    value={poster} 
                    onChange={(e) => setPoster(e.target.value)} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Edit Movie" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
    }
   ```



### Changes in `App.js`

   ```javascript
   <Route path='/edit/:id' element={<Edit />} />
   ```

   - **Purpose**: This line adds a new route to the application’s router configuration. The route allows users to navigate to the `Edit` component when they want to edit a specific movie.
   
   - **Explanation**:
     - **`path='/edit/:id'`**: The `:id` portion is a URL parameter that represents the unique ID of the movie the user wants to edit. When navigating to this path, React Router will capture the `id` from the URL and pass it to the `Edit` component through the `useParams` hook, allowing the component to fetch and update the correct movie data.
     - **`element={<Edit />}`**: This specifies that the `Edit` component should be rendered when the route `/edit/:id` is visited. By associating this route with the `Edit` component, the app can display the edit form for the selected movie.

### Changes in `movieItem.js`

   ```javascript
   import { Link } from 'react-router-dom';
   <Link to={"/edit/" + props.mymovie._id} className="btn btn-primary">Edit</Link>
   ```

   - **Purpose**: This code snippet adds an "Edit" button to each movie item, allowing users to navigate to the edit page for that specific movie.

   - **Explanation**:
     - **`import { Link } from 'react-router-dom';`**: `Link` is a component from React Router that lets you navigate to a new route without refreshing the page. It is used to create in-app navigation.
     - **`to={"/edit/" + props.mymovie._id}`**: This `to` attribute defines the path the `Link` component should navigate to when clicked. Here, it’s dynamically constructed using the base path `/edit/` followed by the unique movie ID, `props.myMovie._id`. This URL structure matches the route defined in `App.js` (`/edit/:id`) and allows React Router to capture the movie’s ID and pass it to the `Edit` component.
     

Together, these changes in `App.js` and `movieItem.js` allow the user to navigate to an edit page for each movie, where the specific movie data can be loaded and updated. The `Link` in `movieItem.js` generates the correct path with the movie ID, and the route in `App.js` ensures that the `Edit` component is rendered when that path is visited.



## Server-Side Changes

In `server.js`, two new routes are added to support editing movie data:

1. **GET `/api/movie/:id`**: This route fetches a specific movie by its ID. It’s used to retrieve the current movie details, which are shown in the edit form. The `:id` parameter represents the movie’s unique identifier. The server looks up this movie in the database and sends its details back to the client.

   ```javascript
   app.get('/api/movie/:id', async (req, res) => {
       let movie = await Movie.findById({ _id: req.params.id });
       res.send(movie);
   });
   ```

2. **PUT `/api/movie/:id`**: This route updates a specific movie’s information. When the user submits the edited data, this route takes the updated details from `req.body` and updates the movie in the database. The server then returns the updated movie details to confirm the change.

   ```javascript
   app.put('/api/movie/:id', async (req, res) => {
       let movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
       res.send(movie);
   });
   ```


---
## Summary

In this lab, you learned how to extend a MERN stack application to support updating data in a MongoDB database. Specifically, you:

- Created a new functional component in React to allow users to edit movie details.
- Utilized the `useParams` hook to capture dynamic parameters from the URL.
- Used `useState` and `useEffect` to manage component state and perform data fetching and updating.
- Employed `axios` for HTTP requests to retrieve and update movie data.
- Configured Express routes on the server side to handle `PUT` requests for updating movies in the MongoDB database.

This lab reinforced core concepts of CRUD operations within the MERN stack and improved your understanding of handling data updates in a full-stack application.