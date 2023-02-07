import { Password } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const ForgotPassword = () => {
    const [message, setMessage] = useState("");
    const [password, setPassword] = useState("");

    const { id, token } = useParams();
    // console.log(id,"id")
    // console.log(token,"token");

    const history = useNavigate();

    const userValid = async () => {
        const res = await fetch(`https://password-reset-gi44.onrender.com/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "content-Type": "application/json"
            }
        });

        const data = await res.json()
        // console.log(data);

        if (data.status == 201) {
            console.log("user valid ")
        } else {
            history("/*")
        }
    }

    const setval = (e) => {
        setPassword(e.target.value)
    }

    const sendpassword = async (e) => {
        e.preventDefault();

        const res = await fetch(`https://password-reset-gi44.onrender.com/forgotpassword/${id}/${token}`, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({ password })
        });

        const data = await res.json()
        console.log(data);
        if (data.status == 201) {
            // console.log("user valid ")
            setPassword("")
            setMessage(true)
        } else {
            toast.error("! Token Expired generate new Link")
        }
    }

    useEffect(() => {
        userValid()
    }, [])

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Your New Password </h1>

                    </div>

                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Succesfully Updated</p> : ""}

                    <form>
                        <div className="form_input">
                            <label htmlFor="password">New password</label>
                            <input type="password" value={password} onChange={setval} name="password" id="password" placeholder='Enter Your new password' />
                        </div>

                        <button className='btn' onClick={sendpassword}>Send</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default ForgotPassword