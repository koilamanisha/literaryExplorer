import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import '../styles.css';

import Container from "react-bootstrap/esm/Container";

export default function Review(){
    const navigate = useNavigate();
    const [userReview, setUserReview] = useState("");
    const [userRating, setUserRating] = useState(3);
    const [book, setBook] = useState("");

    let bookID = "";
    let userEmail = "";
    let userName = "";

    const location = useLocation();
    try{
        bookID = location.state.bookID;
        userEmail = location.state.userEmail;
        userName = location.state.userName;
    }

    catch(err){
        // If accessing without token, will be sent back to the login page.
        navigate("/")
    }

    useEffect(() => {
        axios.post("https://mkoila-backend-deploy.onrender.com/getBook", {bookID: bookID})
        .then((res) => {
            setBook(res.data[0]);
            console.log(res.data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [])

    console.log(book.title)

    return <Container className="py-5">
        <button className="btn btn-secondary" onClick={() => {
                                                              navigate("/home", { state: { userEmail: userEmail, userName: userName } })  
                                                            }}>Home</button>
        <br />
        <br />
        <h3 className="text-center">Hello {userName}</h3>
        <br />
        <label className="col-sm-2">Book ID:</label>
        <input type="text" name="name" className="px-2 col-sm-10 " value={book.bookID} />
        <label className="col-sm-2">Book Title:</label>
        <input type="text" name="name" className="px-2  col-sm-10" value={book.title} />
        <label className="col-sm-2">Author Name:</label>
        <input type="text" name="name" className="px-2  col-sm-10" value={book.authorName} />
        <label className="col-sm-2">Number of Pages:</label>
        <input type="text" name="name" className="px-2  col-sm-10" value={book.num_pages} />
        <label className="col-sm-2">Publisher:</label>
        <input type="text" name="name" className="px-2  col-sm-10" value={book.publisher} />
        <label className="col-sm-2">Average Rating:</label>
        <input type="text" name="name" className="px-2  col-sm-10" value={book.average_rating} />
        <label className="col-sm-2">Rating Count:</label>
        <input type="text" name="name" className="px-2  col-sm-10" value={book.ratings_count} />
        <br />
        <br />
        <h3 className="text-center">Enter your Review of this book here:</h3>

        <label>Your Email ID:</label>
        <input type="text" name="name" className="px-2 form-control col-xs-4 col-md-12 flex" value={ userEmail } />
        
        <label>Write your review of the book:</label>
        <input type="text" name="name" className="px-2 form-control col-xs-4 col-md-12 flex" onChange={(e) => setUserReview(e.target.value)} />
        
        <label>Your Rating:</label>
        <select className="form-control" value={userRating} onChange={e => setUserRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <br />
        <button className="btn btn-primary" onClick={() => {
                                            axios.post("https://mkoila-backend-deploy.onrender.com/addReview", {userID: userEmail, bookID: book.bookID, review: userReview, rating: userRating, likes: 0});
                                            navigate("/home", { state: { userEmail: userEmail, userName: userName } })  
                                        }} >Submit </button>
    </Container>
}