// Assume everything is written with TailwindCSS and DaisyUI
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../lib/apiWrapper";
import { UserType } from "../types";

type AdminClientInfoProps = {
    currentUser: UserType | undefined;
};

export default function AdminClientInfo({ currentUser }: AdminClientInfoProps) {
    const { user_id } = useParams();

    console.log(user_id);

    const [client, setClient] = useState<UserType | undefined>(undefined);

    useEffect(() => {
        if (!currentUser?.token) {
            console.log("Waiting for user and token...");
            return;
        }

        async function getClientInfo() {
            let response = await getUserById(
                parseInt(user_id!),
                currentUser!.token
            );
            if (response.data) {
                setClient(response.data);
            }
        }

        getClientInfo();
    }, [currentUser, user_id]);

    console.log(client);



    return (
        <div className="flex flex-wrap justify-center">
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Client Information</h1>
                        {client && (
                            <div className="py-6">
                                <h2 className="text-3xl font-bold">
                                    {client.first_name} {client.last_name}
                                </h2>
                                <p className="text-lg">
                                    Email: {client.email}
                                </p>
                                <p className="text-lg">
                                    Phone Number: {client.phone_number}
                                </p>
                                <p className="text-lg">
                                    Address: {client.street1}, {client.city}, {client.state}, {client.zip}
                                </p>
                                <h3 className="text-2xl font-bold mt-4">
                                    Emergency Contacts
                                </h3>
                                {client.emergency_contacts?.map((contact, index) => (
                                    <div key={index} className="mt-2">
                                        <p className="text-lg">
                                            Name: {contact.first_name} {contact.last_name}
                                        </p>
                                        <p className="text-lg">
                                            Email: {contact.email}
                                        </p>
                                        <p className="text-lg">
                                            Phone Number: {contact.phone_number}
                                        </p>
                                    </div>
                                ))}
                                <h3 className="text-2xl font-bold mt-4">
                                    Veterinarians
                                </h3>
                                {client.veterinarians?.map((vet, index) => (
                                    <div key={index} className="mt-2">
                                        <p className="text-lg">
                                            Name: {vet.name}
                                        </p>
                                        <p className="text-lg">
                                            Clinic: {vet.clinic}
                                        </p>
                                        <p className="text-lg">
                                            Email: {vet.email}
                                        </p>
                                        <p className="text-lg">
                                            Phone Number: {vet.phone_number}
                                        </p>
                                        <p className="text-lg">
                                            Address: {vet.street1}, {vet.city}, {vet.state}, {vet.zip}
                                        </p>
                                    </div>
                                ))}
                                <p className="text-lg mt-4">
                                    Private Notes: {client.private_notes}
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
