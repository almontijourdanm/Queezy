import { useNavigate, Link } from 'react-router'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useState } from 'react'

export default function Registerpage() {

    const nav = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    async function handleRegister(event) {
        try {
            event.preventDefault()
            let { data } = await axios({
                method: 'POST',
                url: 'https://gc01.destyan.tech/register',
                data: formData
            })

            nav('/login')

        } catch (error) {
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
                    <h1 className="text-5xl font-bold text-cyan-400 drop-shadow-lg">Register Now!</h1>
                    <p className="py-6 text-gray-200">
                        Welcome to the Ultimate Quiz Challenge! 
                        Sign up now and put your knowledge to the test. Play, learn, and compete with friends!
                    </p>
                </div>
                <div className="card w-full max-w-sm shadow-2xl bg-gray-900 border border-gray-700">
                    <div className="card-body">

                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">

                                <label className="fieldset-label text-gray-300">Username</label>
                                <input
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    type="text" className="input bg-gray-800 text-white border border-gray-600 focus:border-cyan-400" placeholder="Username" />

                                <label className="fieldset-label text-gray-300">Email</label>
                                <input
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    type="email" className="input bg-gray-800 text-white border border-gray-600 focus:border-cyan-400" placeholder="Email" />

                                <label className="fieldset-label text-gray-300">Password</label>
                                <input
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    type="password" className="input bg-gray-800 text-white border border-gray-600 focus:border-magenta-400" placeholder="Password" />

                                <div className="mt-2">
                                    <p> Already have an account ? <Link to="/login" className='link link-hover text-cyan-400 hover:text-magenta-400'> Login </Link></p>
                                </div>

                                <button className="btn mt-4 bg-cyan-500 hover:bg-magenta-500 text-white font-bold">Register</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}