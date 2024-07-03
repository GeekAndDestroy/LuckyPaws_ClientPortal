// Assume everything is written with TailwindCSS and DaisyUI
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryType, LogInFormDataType } from "../types";
import { login } from "../lib/apiWrapper";

type LogInProps = {
    flashMessage: (
        newMessage: string | undefined,
        newCategory: CategoryType | undefined
    ) => void;
    logUserIn: () => void;
};

export default function LogIn({ flashMessage, logUserIn }: LogInProps) {
    const navigate = useNavigate();

    const [logInFormData, setLogInFormData] = useState<LogInFormDataType>({
        email: "",
        password: "",
    });

    // const [seePassword, setSeePassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogInFormData({ ...logInFormData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(logInFormData);

        let response = await login(logInFormData.email, logInFormData.password);
        if (response.error) {
            console.log(response.error);
            flashMessage(response.error, "danger");
        } else {
            console.log(response.data!)
            console.log(response)
            let newUser = response.data!;
            localStorage.setItem("email", newUser.email);
            localStorage.setItem("first_name", newUser.first_name);
            localStorage.setItem("last_name", newUser.last_name);
            localStorage.setItem("user_id", newUser.user_id.toString());
            localStorage.setItem("is_admin", newUser.is_admin?.toString() ?? "false");
            localStorage.setItem("token", newUser.token);
            flashMessage(`Welcome back, ${newUser.first_name}!`, "success");
            console.log(newUser);
            logUserIn();
            navigate("/");
        }
    }

    return (
        <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
            <img
                src="/assets/luckypawslogo.png"
                className="mx-auto pt-20"
                width="200"
                height="200"
            />
            <h1 className="text-center text-2xl sm:text-3xl font-semibold py-4">
                Log In
            </h1>
            <form onSubmit={handleFormSubmit}>
                <div className="mx-auto w-80 sm:max-w-md md:max-w-lg flex flex-col gap-5">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="input input-bordered"
                        value={logInFormData.email}
                        onChange={handleInputChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input input-bordered"
                        value={logInFormData.password}
                        onChange={handleInputChange}
                    />
                    <button className="btn btn-secondary shadow-lg shadow-fuchsia-800">
                        Log In
                    </button>
                    <a href="/signup" className="text-center link-secondary">
                        Don't have an account? Sign Up
                    </a>
                </div>
            </form>
        </div>
    );
}
