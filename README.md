# Lab 9 Solution: MERN Delete Data Representation and Querying

This lab focuses on adding delete functionality to a MERN (MongoDB, Express.js, React, Node.js) stack application, specifically for managing movies.

## Instructions

1. **Commit and push each solution to GitHub after completing an exercise.**
  


2. **Set Up the Application**
   - In the previous lab, you configured a React application to perform CRUD (Create, Read, Update) operations, including creating, reading, and updating data in MongoDB.
   - If you did not complete the application in the last lab, clone the [lab solution on GitHub](https://github.com/Data-Rep-MERN-Application/lab_eight):

     ```bash
     git clone https://github.com/Data-Rep-MERN-Application/lab_eight
     cd lab_eight
     npm install
     ```
-----
3. **Add Delete Functionality**
   - Modify the React and server applications to allow users to delete movies and refresh the movie list.

   ### Solution Code

   #### React Changes

   - **In `movieItem.js`**:

     ```javascript
     import axios from "axios";
     import Button from 'react-bootstrap/Button';

     <Button variant="danger" onClick={(e) => {
         e.preventDefault();
         axios.delete('http://localhost:4000/api/movie/' + props.myMovie._id)
             .then()
             .catch();
     }}>Delete</Button>
     ```

   #### Server Changes

   - **In `server.js`**:

     ```javascript
     app.delete('/api/movie/:id', async (req, res) => {
         console.log('Deleting: ' + req.params.id);
         let movie = await movieModel.findByIdAndDelete({ _id: req.params.id });
         res.send(movie);
     });
     ```

4. **Refresh the List After Deletion**
   - After a movie is deleted, the application should refresh the movie list to reflect the changes.

   ### Solution Code

   - **In `movieItem.js`**:

     ```javascript
     <Button variant="danger" onClick={(e) => {
         e.preventDefault();
         axios.delete('http://localhost:4000/api/movie/' + props.myMovie._id)
             .then((res) => {
                 let reload = props.Reload();
             })
             .catch();
     }}>Delete</Button>
     ```

   - **In `movies.js`**:

     ```javascript
     import MovieItem from "./movieItem";

     function Movies(props) {
         return props.myMovies.map((movie) => {
             return <MovieItem myMovie={movie} key={movie._id} Reload={() => { props.ReloadData(); }}></MovieItem>;
         });
     }

     export default Movies;
     ```

   - **In `read.js`**:

     ```javascript
     const Reload = (e) => {
         console.log("reloading data");
         axios.get('http://localhost:4000/api/movies')
             .then((response) => {
                 setData(response.data);
             })
             .catch((error) => {
                 console.log(error);
             });
     };

     <div>
         <h2>Hello from Read Component!</h2>
         <Movies myMovies={data} ReloadData={Reload}></Movies>
     </div>
     ```

---

This completes Lab 9, which introduced delete functionality and automatic refresh of the movie list in a MERN stack application.
