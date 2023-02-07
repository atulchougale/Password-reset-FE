import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import "./mix.css"

const Login = () => {


    const [passShow, setPassShow] = useState(false)

    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    })

    const history = useNavigate();

    //  console.log(inpval)

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }

    const loginuser = async (e) => {
        e.preventDefault();

        const { email, password } = inpval;

        if (email === "") {
            toast.error("email is required!", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else {
            // console.log("User Login Successfully Done ")


            const data = await fetch("/login", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const res = await data.json();
            // console.log(res);

            if (res.status == 201) {
                localStorage.setItem("userdatatoken", res.result.token)
                // console.log(res.result.token)
                history("/dashboard")
                setInpval({ ...inpval, email: "", password: "" })
            } else {
                toast.error("Invalid Credentials", {
                    position: "top-center"
                });
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcom Back, Log In </h1>
                        <p>Hi, We are glad you are back. Please login.</p>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={setVal} value={inpval.email} id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} name="password" onChange={setVal} id="password" value={inpval.password} placeholder='Enter Your Password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={loginuser}>Login</button>
                        <p> Don't have an Account? <NavLink to="/register">Sing Up</NavLink></p>
                        <p style={{ color: "black", fontWeight: "bold" }}>Forgot Password  <NavLink to="/password-reset">Click Here</NavLink> </p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Login