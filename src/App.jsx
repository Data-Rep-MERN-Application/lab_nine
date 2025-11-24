import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Content from './components/content';
import Header from './components/header';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Read from './components/read';
import Create from './components/create';
import Edit from './components/edit';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* this is my comment. */}
      <BrowserRouter>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/read">Read</Nav.Link>
              <Nav.Link href="/create">Create</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/' element={<Content></Content>}></Route>
          <Route path='/read' element={<Read />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path ='/edit/:id' element={<Edit></Edit>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )  
}

export default App
