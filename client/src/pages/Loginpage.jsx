import axios from 'axios'
import Swal from "sweetalert2"
import { useNavigate, Link } from 'react-router'
import { useEffect, useState } from 'react'
import socket from '../config/socket'

export default function Loginpage() {

    let nav = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    useEffect(() => {
        if (localStorage.getItem('access_token')) { 
            nav('/')
        }
    }, [])

    async function handleLogin(event) {
        try {
            event.preventDefault()
            let { data } = await axios({
                method: 'POST',
                url: 'https://gc01.destyan.tech/login',
                data: form
            })

            localStorage.setItem('access_token', data.access_token);

            socket.disconnect();
            socket.connect();

            nav('/')

        } catch (error) {
            console.log(error, "ini error<><><");
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,

            })
        }
    }

    return (
        <div className="hero min-h-screen bg-gradient-to-r from-blue-900 via-purple-800 to-purple-600">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left text-white">
                    <h1 className="text-5xl font-bold text-cyan-400 drop-shadow-lg">Queezy</h1>
                    <p className="py-6 text-gray-200">
                        Welcome Back!
                        <br /> 
                            Log in to continue your quiz journey and challenge yourself with AI-powered questions!
                    </p>
                    {/* <h1 className="text-6xl font-bold font-bebas text-accent tracking-wide">
                        Start Your Quiz Now!
                    </h1> */}
                </div>
                <div className="card w-full max-w-sm shadow-2xl bg-gray-900 border border-gray-700">
                    <div className="card-body">

                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">

                                <label className="fieldset-label text-gray-300">Email</label>
                                <input
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    type="email" className="input bg-gray-800 text-white border border-gray-600 focus:border-cyan-400" placeholder="Email" />

                                <label className="fieldset-label text-gray-300 mt-4">Password</label>
                                <input
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    type="password" className="input bg-gray-800 text-white border border-gray-600 focus:border-magenta-400" placeholder="Password" />

                                <div className="mt-2">
                                    <p> Not have account yet? <Link to="/register" className='link link-hover text-cyan-400 hover:text-magenta-400'> Register </Link></p>
                                </div>

                                <button className="btn mt-4 bg-cyan-500 hover:bg-magenta-500 text-white font-bold">Login</button>
                            </fieldset>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}