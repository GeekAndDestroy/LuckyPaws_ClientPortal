// Assume everything is written with TailwindCSS and DaisyUI
import { useEffect, useState } from "react";
import DogCard from "../Components/DogCard";
import EmergencyContactInfo from "../Components/EmergencyContactInfo";
import ProfileInfo from "../Components/ProfileInfo";
import VeterinarianInfo from "../Components/VeterinarianInfo";
import { CategoryType, DogType, UserType } from "../types";
import { getDogsByUserID } from "../lib/apiWrapper";

type ProfileProps = {
    flashMessage: (newMessage: string, category: CategoryType) => void;
    currentUser: UserType;
};

export default function Profile({ flashMessage, currentUser }: ProfileProps) {
    const [dogs, setDogs] = useState<Partial<DogType>[]>([]);

    useEffect(() => {
        if (!currentUser?.token) {
            console.log("Waiting for user and token...");
            return;
        }
        async function getDogs() {
            let response = await getDogsByUserID(
                currentUser!.user_id,
                currentUser!.token
            );
            if (response.data) {
                let dogs = response.data;
                console.log(dogs);
                setDogs(dogs);
            } else if (response.error) {
                console.log(response.error, "danger");
            } else {
                flashMessage("An Error Occurred", "warning");
            }
        }
        getDogs();
    }, [currentUser?.token, currentUser?.user_id]);

    return (
        <>
            <div className="divider">Dog(s)</div>
            <div className="">
                <div className="flex flex-wrap justify-around">
                    <div className="card card-compact w-36 lg:h-80 sm:w-60 p-4 bg-base-100 shadow-xl  m-2">
                        <figure>
                            <img
                                src="/assets/paw.svg"
                                height="150"
                                width="150"
                                alt="Paw"
                            />
                        </figure>
                        <div className="card-body">
                            <div className="card-actions justify-center align-bottom">
                                <button
                                    className="btn btn-secondary shadow-md shadow-fuchsia-800 "
                                    onClick={() =>
                                        (window.location.href = "./newdog")
                                    }
                                >
                                    Add Dog
                                </button>
                            </div>
                        </div>
                    </div>
                    {dogs.map((d) => (
                        <DogCard key={d.dog_id} dog={d} />
                    ))}
                </div>
            </div>
            <div className="divider">Profile</div>
            <div className="flex flex-wrap justify-center">
                <ProfileInfo
                    currentUser={currentUser}
                    flashMessage={flashMessage}
                />
            </div>
            <div className="divider">Emergency Contact</div>
            <div className="flex flex-wrap justify-center">
                <EmergencyContactInfo
                    currentUser={currentUser}
                    flashMessage={flashMessage}
                />
            </div>
            <div className="divider">Veterinarian</div>
            <div className="flex flex-wrap justify-center">
                <VeterinarianInfo
                    currentUser={currentUser}
                    flashMessage={flashMessage}
                />
            </div>
            {/* profile form */}
        </>
    );
}
