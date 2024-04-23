// Assume everything is written with TailwindCSS and DaisyUI
import DogCard from "../Components/DogCard";
import ProfileInfo from "../Components/ProfileInfo";

type ProfileProps = {};

export default function Profile({}: ProfileProps) {
    return (
        <>
            <div className="divider">My Profile</div>
            <div className="flex flex-wrap justify-center">               
                    <ProfileInfo />               
            </div>
            <div className="divider">Dog(s)</div>
            <div className="flex flex-wrap">
                <div className="w-1/2 lg:w-1/4 p-2">
                    <DogCard />
                </div>
                <div className="card card-compact w-1/2 lg:w-1/4 p-2 bg-base-100 shadow-xl">
                    <figure>
                        <img
                            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"
                        />
                    </figure>
                    <div className="card-body">
                        <div className="card-actions justify-center">
                            <button className="btn btn-secondary">Add Dog</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
