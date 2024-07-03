// Assume everything is written with TailwindCSS and DaisyUI
import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { CategoryType, UserType, VeterinarianType } from "../types";
import {
    createVeterinarian,
    editVeterinarian,
    getVeterinariansByUserID,
} from "../lib/apiWrapper";


type VeterinarianInfoProps = {
  flashMessage: (newMessage: string, category: CategoryType) => void;
  currentUser: UserType | undefined;
};

export default function VeterinarianInfo({ flashMessage, currentUser }: VeterinarianInfoProps) {
  // const navigate = useNavigate();


  const [veterinarian, setVeterinarian] = useState<Partial<VeterinarianType>>({});


  useEffect(() => {
    if (!currentUser?.token) {
      console.log("Waiting for user and token...");
      return;
    }
    async function getVeterinarians() {
        let response = await getVeterinariansByUserID(currentUser!.user_id, currentUser!.token)
        if (response.data){
          console.log(response.data);
          const veterinarianResponse = response.data;
          const currentUserId = JSON.parse(localStorage.getItem('user_id')!
        );

          console.log(veterinarianResponse);
          if (!currentUser?.token){
            console.log('No user logged in');
          } else if (veterinarianResponse.user_id !== currentUserId){
            flashMessage('You are not authorized to edit this profile', 'danger');
            console.log(veterinarianResponse.user_id, currentUserId)
          } else {
            setVeterinarian({
              clinic: veterinarianResponse.clinic,
              name: veterinarianResponse.name,
              street1: veterinarianResponse.street1,
              street2: veterinarianResponse.street2,
              city: veterinarianResponse.city,
              state: veterinarianResponse.state,
              zip: veterinarianResponse.zip,
              email: veterinarianResponse.email,
              phone_number: veterinarianResponse.phone_number
            });
          }
        } else if (response.error){
          console.log(response.error, 'danger')
        }
        else {
          flashMessage('An Error Occurred', 'warning');
        }
      }
    getVeterinarians();
  }, [currentUser?.token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVeterinarian({
      ...veterinarian,
      [e.target.id]: e.target.value,
    });
  };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let token = currentUser!.token;
      let response= await getVeterinariansByUserID(currentUser!.user_id, token);
      const vet = response.data;

      try {
        if (vet) {
          await editVeterinarian(veterinarian, vet.user_id, token);
          flashMessage('Veterinarian updated', 'success');
        } else {
          await createVeterinarian(veterinarian as VeterinarianType, token);
          flashMessage('Veterinarian created', 'success');
        }
      } catch (error) {
        console.error("Error updating veterinarian", error);
        flashMessage('Error updating veterinarian', 'warning');
    }
  };




    return (
        <div className="hero w-96 lg:w-3/4 bg-base-200 rounded-lg">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl m-4 font-bold">
                        Veterinarian Info
                    </h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mx-auto w-80 sm:max-w-md md:max-w-lg flex flex-col gap-5">
                            <input
                                type="text"
                                name="clinic"
                                id="clinic"
                                placeholder="Clinic's Name"
                                value={veterinarian.clinic ? veterinarian.clinic : "" }
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Doctor's Name"
                                value={veterinarian.name ? veterinarian.name : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="street1"
                                id="street1"
                                placeholder="Street 1"
                                value={veterinarian.street1 ? veterinarian.street1 : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="street2"
                                id="street2"
                                placeholder="Street 2"
                                value={veterinarian.street2 ? veterinarian.street2 : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="city"
                                id="city"
                                placeholder="City"
                                value={veterinarian.city ? veterinarian.city : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name=""
                                id="state"
                                placeholder="State"
                                value={veterinarian.state ? veterinarian.state : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="zip"
                                id="zip"
                                placeholder="Zip Code"
                                value={veterinarian.zip ? veterinarian.zip : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={veterinarian.email ? veterinarian.email : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="phone_number"
                                id="phone_number"
                                placeholder="Phone Number"
                                value={veterinarian.phone_number ? veterinarian.phone_number : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                        </div>
                        <button className="btn m-4 btn-secondary shadow-lg shadow-fuchsia-800">
                            Update Veterinarian
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
  
}
