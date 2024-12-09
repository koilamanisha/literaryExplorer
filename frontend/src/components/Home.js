import axios from "axios";
import React, { useEffect, useState  } from "react";
import '../styles.css';
import 'bootstrap/dist/css/bootstrap.css';

import { useLocation, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function Home() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const location = useLocation();


  const [searchValue, setSearchValue] = useState("");

  let userEmail = "";
  let userName = "";
  
  try{
    userEmail = location.state.userEmail;
    userName = location.state.userName;
  }
  catch(err){
    navigate("/");
  }
  if(userEmail === ""){
    navigate("/");
  }
  useEffect(() => {
    if(searchValue === ""){
        getAllBooks();
    }
    else{
        const newData = data.filter(value => value.title.toLowerCase().includes(searchValue.toLowerCase()))
        setData(newData);
}
}, [searchValue]);

function getAllBooks(){
    axios.get("https://mkoila-backend-deploy.onrender.com/getAllBooks")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching books data from the backend:", error);
      });
  }


  function reviewBook(bookID){
    navigate("/review", { state: { bookID: bookID, userEmail: userEmail, userName: userName } })
  }


  return (
<>

  <Navbar expand="lg" className=" bg-body-tertiary">
      <Container>
        <Navbar.Brand className="h1 fw-bold mb-0">Literary Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="mx-auto" onClick={()=>{navigate("/home", {state: {userName: userName, userEmail: userEmail}})}}>Home</Nav.Link>
            <Nav.Link className="mx-auto" onClick={()=>{navigate("/reviewPage", { state: { userEmail: userEmail, userName: userName }})}}>All Reviews</Nav.Link>
            <Nav.Link className="mx-auto rounded border border-danger p-2" onClick={()=>{navigate("/")}}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

<>

</>

    <div className="container ">
    
    <h1 className="text-center">Hello { userName } ! </h1>
    <div className="d-flex">
    <label className="px-3" for= "search" >Search for a book</label>
    <input type="text" className=" flex-grow-1 px-1 py-1 mb-4 form rounded border border-warning" name="search" onChange={ (e) => setSearchValue(e.target.value) }/>
</div>
    {data.length === 0 ? <hr /> : <div className="table table-responsive table-striped table-sm">
      <table>
        <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Author Name</th>
              <th scope="col">Number of Pages</th>
              <th scope="col">Publisher</th>
              <th scope="col">Average Ratings</th>
              <th scope="col">Ratings Count</th>
              <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
      {data && data.map((i, index) => (
          <tr key={i.bookID}>
            <td>{index + 1}</td>
            <td>{i.title}</td>
            <td>{i.authorName}</td>
            <td>{i.num_pages}</td>
            <td>{i.publisher}</td>
            <td>{i.average_rating}</td>
            <td>{i.ratings_count}</td>
            <td>
              <button type="button" className="btn btn-info" onClick={() => reviewBook(i.bookID)}> Review </button>
            </td>
          </tr>
      ))}
          </tbody>
        </table>
    </div>}  
     
    </div>

    </>
  );
}

export default Home;