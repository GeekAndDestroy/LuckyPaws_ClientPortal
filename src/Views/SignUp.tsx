// Assume everything is written with TailwindCSS and DaisyUI
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { CategoryType, UserFormDataType, UserType } from "../types";
import { register } from "../lib/apiWrapper";

type SignUpProps = {
    flashMessage: (newMessage:string|undefined, newCategory:CategoryType|undefined) => void
};

export default function SignUp({ flashMessage }: SignUpProps) {
    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<Partial<UserFormDataType>>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    // const [seePassword, setSeePassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({ ...userFormData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            console.log(userFormData);

            let response = await register(userFormData as UserType);
            if (response.error){
                console.log(response.error);
                flashMessage(response.error, 'danger');
            } else {
                let newUser = response.data!;
                flashMessage(`Welcome, ${newUser.first_name}!`, 'success');
                console.log(newUser);
                navigate('/login');
            }
    }


    const disableSubmit =
        (userFormData.password?.length ?? 0) < 5 ||
        userFormData.password !== userFormData.confirm_password;

    return (
        <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
            <img
                src="/assets/luckypawslogo.png"
                className="mx-auto pt-20"
                width="200"
                height="200"
            />
            <h1 className="text-center text-2xl sm:text-3xl font-semibold py-4">
                Sign Up
            </h1>
            <form onSubmit={handleFormSubmit}>
            <div className="mx-auto w-80 sm:max-w-md md:max-w-lg flex flex-col gap-5">
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={userFormData.first_name}
                        onChange={handleInputChange}
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={userFormData.last_name}
                        onChange={handleInputChange}
                        className="input input-bordered"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userFormData.email}
                        onChange={handleInputChange}
                        className="input input-bordered"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={userFormData.password}
                        onChange={handleInputChange}
                        className="input input-bordered"
                    />
                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={userFormData.confirm_password}
                        onChange={handleInputChange}
                        className={"input input-bordered"}
                    />
                    <button
                        className="btn btn-secondary shadow-lg shadow-fuchsia-800"
                        disabled={disableSubmit}
                    >
                        Create Account
                    </button>
                <a href="/login" className="text-center link-secondary ">
                    Already have an account? Log In
                </a>
            </div>
            </form>
        </div>
    );
}
