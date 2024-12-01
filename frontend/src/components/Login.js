import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


function Login(){
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");


    return <div className='container'>
        
        <section className="vh-100">
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-6 text-black">

        <div className="px-5 ms-xl-4">
          <i className="fas fa-crow fa-2x me-3 pt-5 mt-xl-4" style={{color: '#709085'}}></i>
          <span className="h1 fw-bold mb-0">Literary Explorer</span>
        </div>

        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">

          <form style={{width: '23rem'}}>

            <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

            <div className="form-outline mb-4">
              <input type="email" id="userEmail" className="form-control form-control-lg" onChange={(e) => setUserEmail(e.target.value)} />
              <label className="form-label" for="userEmail">Email address</label>
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="password" className="form-control form-control-lg" onChange={(e) => setPassword(e.target.value)} />
              <label className="form-label" for="password">Password</label>
            </div>

            <div className="pt-1 mb-4">
              <button className="btn btn-info btn-lg btn-block" type="button" onClick = { (e) => {
                e.preventDefault();
                axios.post("http://localhost:3001/loginUser", { email: userEmail, password: password })
                    .then((response) => {
                    console.log(response.data);
                    navigate("/home", { state: { userEmail, userName: response.data.userName } })
                    })
                    .catch((error) => {
                        console.error("Error:", error.response.status);
                        if(error.response.status === 401) alert("Account is not found in the database. Please create one!"); 
                        navigate("/register");
                    });
               }}>Login</button>
            </div>

            <p>Don't have an account? <Link to="/register" className="link-info">Register here</Link></p>

          </form>

        </div>

      </div>
      <div className="col-sm-6 px-0 d-none d-sm-block">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
          alt="Cover" className="w-100 vh-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
      </div>
    </div>
  </div>
</section>
    </div>
}
export default Login;