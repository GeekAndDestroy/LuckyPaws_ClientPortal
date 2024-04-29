// Assume everything is written with TailwindCSS and DaisyUI
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DogType, UserType } from "../types";
import { getDogById } from "../lib/apiWrapper";

type AdminDogInfoProps = {
    currentUser: UserType | undefined;
}

export default function AdminDogInfo({ currentUser }: AdminDogInfoProps) {
    const { dog_id } = useParams();

    console.log(dog_id);

    const [dog, setDog] = useState<DogType | undefined>(undefined);

    useEffect(() => {
        if (!currentUser?.token) {
            console.log("Waiting for user and token...");
            return;
        }

        async function getClientInfo() {
            let response = await getDogById(
                parseInt(dog_id!),
                currentUser!.token
            );
            if (response.data) {
                setDog(response.data);
            }
        }

        getClientInfo();
    }, [currentUser, dog_id]);

    console.log(dog);



    return (
      <div className="flex flex-wrap justify-center">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Dog Information</h1>
              {dog && (
                <div className="py-6">
                  <h2 className="text-3xl font-bold">
                    {dog.name}
                  </h2>
                  <p className="text-lg">
                    Breed: {dog.breed}
                  </p>
                  <p className="text-lg">
                    Birthday: {dog.birthday}
                  </p>
                  <p className="text-lg">
                    Gender: {dog.sex}
                  </p>
                  <p className="text-lg">
                    Altered: {dog.altered ? "Yes" : "No"}
                  </p>
                  <p className="text-lg">
                    Health Conditions: {dog.health_conditions}
                  </p>
                  <p className="text-lg">
                    Medications: {dog.medications}
                  </p>
                  <p className="text-lg">
                    Allergies: {dog.allergies}
                  </p>
                  <p className="text-lg">
                    Private Notes: {dog.private_notes}
                  </p>
                  <p className="text-lg">
                    Favorite Activities: {dog.bn_favorite_activities}
                  </p>
                  <p className="text-lg">
                    Issues: {dog.bn_issues}
                  </p>
                  <p className="text-lg">
                    Feeding Schedule: {dog.feeding_schedule}
                  </p>
                  <p className="text-lg">
                    Potty Schedule: {dog.potty_schedule}
                  </p>
                  <p className="text-lg">
                    Crated: {dog.crated ? "Yes" : "No"}
                  </p>
                  <p className="text-lg">
                    Daily Updates: {dog.daily_updates ? "Yes" : "No"}
                  </p>
                </div>
              )}
              <button className="btn btn-secondary" onClick={() => window.history.back()}>Go Back</button>
            </div>
          </div>
        </div>
      </div>
    );
}
