import React from "react";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Login';
import Register from './components/Register';
import {  Routes, Route } from "react-router-dom";


import Container from 'react-bootstrap/Container';
import Home from "./components/Home.js";
import Review from "./components/Review.js";
import ReviewPage from "./components/ReviewPage.js";
import EditReview from "./components/EditReview.js";


function App() {
   return (<>
   <Container>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/review" element={<Review />} />
      <Route path="/reviewPage" element={<ReviewPage />} />
      <Route path="/editReview" element={<EditReview />} />
    </Routes>
   </Container>
</>
)
}

export default App;
