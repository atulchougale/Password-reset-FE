import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css"

const Register = () => {

    const [passShow, setPassShow] = useState(false)
    const [cPassShow, setCPassShow] = useState(false)

    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    // console.log(inpval)

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

    const addUserdata = async (e) => {
        e.preventDefault();

        const { name, email, password, cpassword } = inpval;

        if (name === "") {
            toast.warning("fname is required!", {
                position: "top-center"
            });
        } else if (email === "") {
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
        } else if (cpassword === "") {
            toast.error("cpassword is required!", {
                position: "top-center"
            });
        }
        else if (cpassword.length < 6) {
            toast.error("confirm password must be 6 char!", {
                position: "top-center"
            });
        } else if (password !== cpassword) {
            toast.error("pass and Cpass are not matching!", {
                position: "top-center"
            });
        } else {
            // console.log("User Register Successfully Done ")

            const data = await fetch("/register", {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, password, cpassword
                })
            });

            const res = await data.json();
            // console.log(res);

            if (res.status == 201) {
                toast.success("Registration Successfully done 😃!", {
                    position: "top-center"
                });
                setInpval({ ...inpval, name: "", email: "", password: "", cpassword: "" })
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up </h1>
                        <p style={{ textAlign: "center" }}>We are glad that you will be using Project User Auth to manage <br /> your tasks! We hope that you will like it.  </p>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" onChange={setVal} id="name" value={inpval.name} placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={setVal} id="email" value={inpval.email} placeholder='Enter Your Email Address' />
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
                        <div className="form_input">
                            <label htmlFor="cpassword"> Confirm password</label>
                            <div className="two">
                                <input type={!cPassShow ? "password" : "text"} name="cpassword" onChange={setVal} id="cpassword" value={inpval.cpassword} placeholder='Confirm Password' />
                                <div className="showpass" onClick={() => setCPassShow(!cPassShow)}>
                                    {!cPassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>Already have an Account ? <NavLink to="/">Log In</NavLink> </p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Register