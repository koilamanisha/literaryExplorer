import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


function Register(){
  const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

return <>
          <div className="px-4 py-5 px-md-5 text-center text-lg-start" style={{backgroundColor: 'hsl(0, 0%, 96%)'}}>
            <div className="container">
              <div className="row gx-lg-5 align-items-center">
                <div className="col-lg-6 mb-5 mb-lg-0">
                  <h1 className="my-5 display-3 fw-bold ls-tight">
                    Literary <br />
                    <span className="text-primary">Explorer</span><br />
                  </h1>
                </div>

                <div className="col-lg-6 mb-5 mb-lg-0">
                  <div className="card">
                    <div className="card-body py-5 px-md-5">
                      <form>
                        <div className="row">
                            <div className="mb-4 form-outline">
                              <input type="text" id="name" className="form-control" onChange = {(e) => {setUserName(e.target.value)}} />
                              <label className="form-label" for="name">Full name</label>
                            </div>
                        </div>

                        <div className="form-outline mb-4">
                          <input type="email" id="email" className="form-control" onChange = {(e) => {setUserEmail(e.target.value)}} />
                          <label className="form-label" for="email">Email address</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" id="password" className="form-control" onChange = {(e) => {setPassword(e.target.value)}} />
                          <label className="form-label" for="password">Password</label>
                        </div>

                          <button className="btn btn-primary btn-block mb-4" onClick={(e) => {
                            e.preventDefault();
                            console.log("Payload being sent to backend:", {
                              name: userName,
                              email: userEmail,
                              password: password,
                            });

                            axios.post("https://mkoila-backend-deploy.onrender.com/createUser", {
                                name: userName,
                                email: userEmail,
                                password: password,
                              })
                              .then((res) => {
                                alert("Account successfully created! Please Login to continue");
                                navigate("/");
                              })
                              .catch((err) => {
                                console.log("Error:", err.response?.data || err.message);
                                alert(
                                  err.response?.data?.error ||
                                    "There seems to be a problem! Try logging in or Visit the site later :("
                                );
                              });
                          }}>
                            Sign up
                          </button>

                         <p>Already have an account? <Link to="/" className="link-info">Login Here</Link></p>

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
</> 
}


export default Register;