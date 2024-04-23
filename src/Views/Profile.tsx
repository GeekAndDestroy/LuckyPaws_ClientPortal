// Assume everything is written with TailwindCSS and DaisyUI
import DogCard from "../Components/DogCard";
import EmergencyContactInfo from "../Components/EmergencyContactInfo";
import ProfileInfo from "../Components/ProfileInfo";
import VeterinarianInfo from "../Components/VeterinarianInfo";

type ProfileProps = {};

export default function Profile({}: ProfileProps) {
    return (
        <>
            <div className="divider">Dog(s)</div>
            <div className="flex flex-wrap">
                <div className="w-1/2 lg:w-1/4 p-2">
                    <DogCard />
                </div>
                <div className="card image-full card-compact w-1/2 lg:w-1/4 p-2 bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src="../src/assets/paw.svg"
                            height="100"
                            width="100"
                            alt="Paw"
                        />
                    </figure>
                    <div className="card-body">
                        <div className="card-actions justify-center align-center">
                            <button className="btn btn-secondary">
                                Add Dog
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="divider">Profile</div>
            <div className="flex flex-wrap justify-center">
                <ProfileInfo />
            </div>
            <div className="divider">Emergency Contact</div>
            <div className="flex flex-wrap justify-center">
                <EmergencyContactInfo />
            </div>
            <div className="divider">Veterinarian</div>
            <div className="flex flex-wrap justify-center">
                <VeterinarianInfo />
            </div>
            {/* profile form */}
        </>
    );
}
