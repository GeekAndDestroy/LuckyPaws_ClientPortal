// Assume everything is written with TailwindCSS and DaisyUI
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUser, editUser } from "../lib/apiWrapper";
import { CategoryType, UserType } from "../types";

type ProfileInfoProps = {
    flashMessage: (newMessage: string, category: CategoryType) => void;
    currentUser: UserType | undefined;
};

export default function ProfileInfo({
    flashMessage,
    currentUser,
}: ProfileInfoProps) {
    const navigate = useNavigate();
    // const { userId } = useParams();

    const [user, setUser] = useState<Partial<UserType>>({
        // // user_id: NaN,
        // first_name: "",
        // last_name: "",
        // street1: "",
        // street2: "",
        // city: "",
        // state: "",
        // email: "",
        // zip: undefined,
        // phone_number: undefined
    });

    useEffect(() => {
        if (!currentUser?.token) {
            console.log("Waiting for user and token...");
            return;
        }    

        async function getUserInfo() {
            let response = await getUser(currentUser!.token);
            if (response.data) {
                const user = response.data;
                const currentUserId = JSON.parse(
                    localStorage.getItem("user_id")!
                );

                console.log(user);
                if (!currentUser?.token) {
                    console.log("No user logged in");
                } else if (user.user_id !== currentUserId) {
                    flashMessage(
                        "You are not authorized to edit this profile",
                        "danger"
                    );
                    navigate("/");
                } else {
                    setUser({
                        first_name: user.first_name,
                        last_name: user.last_name,
                        street1: user.street1,
                        street2: user.street2,
                        city: user.city,
                        state: user.state,
                        email: user.email,
                        zip: user.zip,
                        phone_number: user.phone_number,
                    });
                }
            } else if (response.error) {
                console.log(response.error, currentUser!.token);
                // flashMessage(response.error, 'danger');
                // navigate('/');
            } else {
                flashMessage("An error occurred", "warning");
                // navigate('/');
            }
        }
        getUserInfo();
    }, [currentUser?.token]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.id]: e.target.value });
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let token = currentUser!.token;
        let response = await editUser(user, token!);
        if (response.error) {
            flashMessage(response.error, "danger");
        } else {
            flashMessage("Profile updated", "secondary");
        }
    };

    return (
        <div className="hero w-96 lg:w-3/4 bg-base-200 rounded-lg">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl m-4 font-bold">{`${currentUser?.first_name}'s Profile`}</h1>
                    <form  onSubmit={handleFormSubmit}>
                        <div className="mx-auto w-80 sm:max-w-md md:max-w-3xl flex flex-col gap-5">
                            <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                placeholder="First Name"
                                value={user.first_name? user.first_name : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                placeholder="Last Name"
                                value={user.last_name? user.last_name : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="street1"
                                id="street1"
                                placeholder="Street 1"
                                value={user.street1? user.street1 : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="street2"
                                id="street2"
                                placeholder="Street 2"
                                value={user.street2? user.street2 : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="city"
                                id="city"
                                placeholder="City"
                                value={user.city? user.city : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="state"
                                id="state"
                                placeholder="State"
                                value={user.state? user.state : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="zip"
                                id="zip"
                                placeholder="Zip Code"
                                value={user.zip? user.zip : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={user.email? user.email : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="phone_number"
                                id="phone"
                                placeholder="Phone Number"
                                value={user.phone_number? user.phone_number : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                        </div>
                        <button className="btn m-4 btn-secondary shadow-lg shadow-fuchsia-800">
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
