// Assume everything is written with TailwindCSS and DaisyUI
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { LogInFormDataType } from "../types";

type LogInProps = {}

export default function LogIn({}: LogInProps) {

    const navigate = useNavigate();

    const [logInFormData, setLogInFormData] = useState<LogInFormDataType>(
        {
            email: '',
            password: ''
        }
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogInFormData({ ...logInFormData, [e.target.name]: e.target.value })
    }


  return (
    <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
        <img src="/src/assets/luckypawslogo.png" className="mx-auto pt-20" width="200" height="200"/>
        <h1 className="text-center text-2xl sm:text-3xl font-semibold py-4">Log In</h1>
        <div className="mx-auto w-80 sm:max-w-md md:max-w-lg flex flex-col gap-5">
            <input type="email" placeholder="Email" className="input input-bordered"/>
            <input type="password" placeholder="Password" className="input input-bordered"/>
            <button className="btn btn-secondary">Log In</button>
            <a href="/signup" className="text-center link-secondary">Don't have an account? Sign Up</a>
        </div>
    </div>
  )
}