// Assume everything is written with TailwindCSS and DaisyUI
import { useState, useEffect } from "react";
import { CategoryType, DogType, ImageType, UserType } from "../types";
import { uploadImage, uploadImageToCloudinary } from "../lib/apiWrapper";

type AdminClientCardProps = {
    client: UserType | undefined;
    flashMessage: (
        newMessage: string | undefined,
        newCategory: CategoryType | undefined
    ) => void;
    currentUser: UserType;
};

export default function AdminClientCard({ client, flashMessage, currentUser }: AdminClientCardProps) {

    const [file, setFile] = useState<File>();
    const [imageURL, setImageURL] = useState<Partial<DogType>>({});
    const [image, setImage] = useState<Partial<ImageType>>({});

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the state
        setFile(event.target.files![0]);
    };

    const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let response = await uploadImageToCloudinary(file!);
        if (response.error) {
            console.log(response.error);
            flashMessage(response.error, "danger");
        } else {
            console.log(response.data);
            flashMessage(`Image uploaded successfully!`, "success");
        }
        let imageResponse = response.data;
        console.log("imagetest", imageResponse);

        setImage({
            image_url: imageResponse.secure_url,
            client_user_id: currentUser!.user_id,
            description: "Dog Profile Picture",
        });


        let response2 = await uploadImage(currentUser!.token, image);
        if (response2.error) {
            console.log(response2.error);
            flashMessage(response2.error, "danger");
        } else {
            console.log(response2.data);
            flashMessage(`Image uploaded successfully!`, "success");
        }


        // console.log(imageURL);

        // let response3 = await editDog(
        //     imageURL,
        //     parseInt(dogId ?? ""),
        //     currentUser!.token
        // );
        // if (response.error) {
        //     console.log(response.error);
        //     flashMessage(response.error, "danger");
        // } else {
        //     let newDog = response.data!;
        //     flashMessage(`Picture Updated!`, "success");
        //     console.log(newDog);
        }

    return (
        <div className="card card-compact bg-base-100 shadow-xl m-1 w-36 sm:w-60 p-4">
            <div className="card-body ">
                <h2 className="card-title text-center">
                    {client!.first_name} {client!.last_name}
                </h2>
                <div className="card-actions justify-center">
                    <button className="btn btn-secondary shadow-md shadow-fuchsia-800" onClick={() => window.location.href = `/clientadmin/${client?.user_id}`}>
                        View Info
                    </button>
                    <form onSubmit={handleFileUpload}>
                            <div className="mx-auto w-44 flex flex-col">
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    className="input input-bordered"
                                    onChange={onFileChange}
                                    
                                />
                                <button className="btn m-4 btn-secondary shadow-lg shadow-fuchsia-800 mx-auto w-44 flex flex-col gap-5">
                                    Add Picture
                                </button>
                            </div>
                        </form>

                </div>
            </div>
        </div>
    );
}
