// Assume everything is written with TailwindCSS and DaisyUI
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryType, DogType, UserType } from "../types";
import { getAllUsers, getDogs } from "../lib/apiWrapper";
import AdminClientCard from "../Components/AdminClientCard";
import AdminDogCard from "../Components/AdminDogCard";

type AdminProps = {
    isAdmin: boolean | null;
    isLoggedIn: boolean;
    flashMessage: (
        newMessage: string | undefined,
        newCategory: CategoryType | undefined
    ) => void;
};

export default function Admin({
    isAdmin,
    isLoggedIn,
    flashMessage,
}: AdminProps) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            flashMessage("You must be logged in to view this page", "warning");
            navigate("/login");
        } else if (!isAdmin) {
            flashMessage("You must be an admin to view this page", "warning");
            navigate("/");
        }
    }, [isAdmin, isLoggedIn]);

    const [clients, setClients] = useState<Partial<UserType[]>>([]);
    const [dogs, setDogs] = useState<Partial<DogType[]>>([]);

    useEffect(() => {
        async function getUsersAndDogs() {
            let users = await getAllUsers();
            let dogs = await getDogs();
            if (users.data && dogs.data) {
                setClients(users.data);
                setDogs(dogs.data);
            } else if (users.error || dogs.error) {
                flashMessage("An error occurred", "warning");
            }
        }
        getUsersAndDogs();
    }, []);

    return (
        <div className="m-10">
            <div className="collapse collapse-plus bg-base-200 mb-4">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    Clients
                </div>
                <div className="collapse-content ">
                    <div className="flex flex-wrap w-screen">
                        <div className="w-1/2 m-6 p-2">
                            {clients.map(c => <AdminClientCard key={c?.user_id} client={c} />)}
                        </div>
                    </div>
                </div>
            </div>
            <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" />
                <div className="collapse-title text-xl font-medium">Dogs</div>
                <div className="collapse-content">
                    <div className="w-1/2 lg:w-1/4 m-10 p-2">
                        {dogs.map(d => <AdminDogCard key={d?.dog_id} dog={d} />)}
                    </div>
                </div>
            </div>
        </div>
    );
}
