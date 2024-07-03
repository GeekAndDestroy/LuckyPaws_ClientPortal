// Assume everything is written with TailwindCSS and DaisyUI
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryType, EmergencyContactType, UserType } from "../types";
import {
    createEmergencyContact,
    editEmergencyContact,
    getEmergencyContactByUserID
} from "../lib/apiWrapper";

type EmergencyContactInfoProps = {
    flashMessage: (newMessage: string, category: CategoryType) => void;
    currentUser: UserType | undefined;
};

export default function EmergencyContactInfo({ flashMessage, currentUser }: EmergencyContactInfoProps) {
  // const navigate = useNavigate();
  const { ecId } = useParams();

  const [emergencyContacts, setEmergencyContacts] = useState<Partial<EmergencyContactType>>({});



    // useEffect(() => {
    //   const fetchEmergencyContacts = async () => {
    //     try {
    //       const response = await getEmergencyContacts(userId);
    //       if (response.length > 0) {
    //         // Emergency contact already exists, set the state
    //         setEmergencyContacts(response[0]);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching emergency contacts:", error);
    //     }
    //   };

    //   fetchEmergencyContacts();
    // }, [userId]);


  useEffect(() => {
    if (!currentUser?.token) {
      console.log("Waiting for user and token...");
      return;
    }   
    async function getEmergencyContacts() { 
        let response = await getEmergencyContactByUserID(currentUser!.user_id, currentUser!.token)
        if (response.data){
          console.log(response.data);
          const emergencyContact = response.data;
          const currentUserId = JSON.parse(localStorage.getItem('user_id')!
        );

          console.log(emergencyContact);
          if (!currentUser?.token){
            console.log('No user logged in');
          } else if (emergencyContact.user_id !== currentUserId){
            flashMessage('You are not authorized to edit this profile', 'danger');
            console.log(emergencyContact.user_id)
            console.log(currentUserId)
            
            // navigate('/');
          } else {
            setEmergencyContacts({
              first_name: emergencyContact.first_name,
              last_name: emergencyContact.last_name,
              email: emergencyContact.email,
              phone_number: emergencyContact.phone_number
            })
          }
        } else if (response.error){
          console.log(response.error);
          // flashMessage(response.error, 'danger');
          // navigate('/');
        } else {
          flashMessage('An error occurred', 'warning');
          // navigate('/');
        }
      }
      getEmergencyContacts();
    }, [currentUser?.token, ecId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmergencyContacts({...emergencyContacts, [e.target.id]: e.target.value});
    };


    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let token = currentUser!.token;
      let response = await getEmergencyContactByUserID(currentUser!.user_id, currentUser!.token)
      const ec = response.data;

      try {
        if (ec) {
          // Emergency contact already exists, update it
          await editEmergencyContact(emergencyContacts, ec.ec_id, token);
          flashMessage("Emergency contact updated successfully", "success");
        } else {
          // No emergency contact exists, create a new one
          await createEmergencyContact(emergencyContacts as EmergencyContactType, token);
          flashMessage("Emergency contact created successfully", "success");
        }
      } catch (error) {
        console.error("Error saving emergency contact:", error);
        flashMessage("Failed to save emergency contact", "warning");
      }
    };


    return (
        <div className="hero w-96 lg:w-3/4 bg-base-200 rounded-lg">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl m-4 font-bold">
                        Emergency Contact Info
                    </h1>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mx-auto w-80 sm:max-w-md md:max-w-lg flex flex-col gap-5">
                            <input
                                type="text"
                                name="first_name"
                                id="first_name"
                                placeholder="First Name"
                                value={emergencyContacts.first_name? emergencyContacts.first_name : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="text"
                                name="last_name"
                                id="last_name"
                                placeholder="Last Name"
                                value={emergencyContacts.last_name? emergencyContacts.last_name : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={emergencyContacts.email? emergencyContacts.email : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                            <input
                                type="tel"
                                name="phone_number"
                                id="phone_number"
                                placeholder="Phone Number"
                                value={emergencyContacts.phone_number? emergencyContacts.phone_number : ""}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                        </div>
                        <button className="btn m-4 btn-secondary shadow-lg shadow-fuchsia-800">
                            Update Emergency Contact
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}



