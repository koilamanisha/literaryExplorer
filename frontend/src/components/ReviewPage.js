import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";
import '../styles.css';

import { useNavigate, useLocation } from "react-router-dom";

function ReviewPage(){
    const navigate = useNavigate();
    const location = useLocation();

    const [reviewData, setReviewData] = useState([]);

    let userName = "";
    let userEmail = "";

    try{
        userName = location.state.userName;
        userEmail = location.state.userEmail;
    }

    catch(err){
        // Navigate back to home page, if trying to access withot authorization.
        navigate("/")
    }
  if(userEmail === ""){
    navigate("/");
  }
    function getAllReviews(){
        axios.get("http://localhost:3001/getAllReviews")
            .then((response)=>{setReviewData(response.data)})
    }

    return <>
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



    <Container className="py-5">
        <h1>Welcome to the Review page { userName }</h1>
        <p>Here, you can find the reviews given by you, and all other people. You can even like or upvote a book review.</p>
    
        <button className="btn btn-primary" onClick={()=>{axios.post("http://localhost:3001/getMyReviews", {userID: userEmail})
                                            .then((response)=>{setReviewData(response.data)})}}>Get My reviews</button>
        <button className="btn btn-primary mx-4" onClick={getAllReviews}>Checkout all reviews</button>
        <button className="btn btn-primary" onClick={()=>{
            navigate("/home", {state: {userName: userName, userEmail: userEmail}})
        }}>Go Back</button>
    
        {/* Show All Reviews */}
        {reviewData.length === 0 ? <hr /> : <div className="table table-responsive ">
      <table>
        <thead>
            <tr>
              <th scope="col">#</th>
              <th  className="px-3" scope="col">Title</th>
              <th scope="col" className="px-3">Average Rating</th>
              <th scope="col" className="px-3">User Review</th>
              <th scope="col" className="px-3">User Rating</th>
              <th scope="col" className="px-3">Review By</th>
              <th scope="col" className="px-3">Likes</th>
              <th scope="col" className="px-3"></th>
            </tr>
        </thead>
        <tbody>

      {reviewData && reviewData.map((i, index) => (

          <tr key={i.reviewID}>
            <td>{index + 1}</td>
            <td className="px-3">{i.title}</td>
            <td className="px-4">{i.average_rating}</td>
            <td className="px-3">{i.review}</td>
            <td className="px-3">{i.rating}</td>
            <td className="px-3">{i.name}</td>
            <td className="px-3">{i.likes}</td>
            <td>
              <button type="button" className="btn btn-info" onClick={() => axios.post("http://localhost:3001/addLike", {reviewID: i.reviewID, likesCount: i.likes + 1})
                                                                                .then(alert("Review Liked!"))}> Like </button>
            </td>
            <td>
              <button type="button" className="btn btn-danger" onClick={() => axios.post("http://localhost:3001/addLike", {reviewID: i.reviewID, likesCount: i.likes - 1})
                                                                                .then(alert("Review Disliked"))}> Dislike </button>
            </td>
            {i.userID === userEmail ? <td>
              <button type="button" className="btn btn-secondary" onClick={()=>{navigate("/editReview", {state:{bookID: i.bookID, reviewID: i.reviewID, userEmail: userEmail, userName: userName}})}}> Edit </button>
            </td> : <td>
            <button type="button" className="btn btn-secondary disabled"  > Edit </button>
            </td> }
            
          </tr>
      ))}
          </tbody>
        </table>
    </div>
        }

    </Container>
    </>
}

export default ReviewPage;
