// Assume everything is written with TailwindCSS and DaisyUI
import { useState } from "react";
import { CategoryType, ImageType, UserType } from "../types";
import { uploadImage, uploadImageToCloudinary } from "../lib/apiWrapper";

type AdminClientCardProps = {
    client: UserType | undefined;
    flashMessage: (
        newMessage: string | undefined,
        newCategory: CategoryType | undefined
    ) => void;
    currentUser: UserType;
};

export default function AdminClientCard({
    client,
    flashMessage,
    currentUser,
}: AdminClientCardProps) {
    const [file, setFile] = useState<File>();
    const [image, setImage] = useState<Partial<ImageType>>({});
    const [imageDesc, setImageDesc] = useState<string>("");

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the state
        setFile(event.target.files![0]);
    };

    const onDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setImageDesc(event.target.value);
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
            image_url: imageResponse.public_id,
            client_user_id: client!.user_id,
            description: imageDesc,
        });

        console.log("description after setImage", imageDesc);
        console.log("after setImage", image);

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
    };

    return (
        <div className="card card-compact bg-base-100 shadow-xl m-1 w-36 sm:w-60">
            <div className="card-body ">
                <p className="card-title text-center">
                    {client!.first_name} {client!.last_name}
                </p>
                <div className="card-actions justify-center">
                    <button
                        className="btn btn-secondary shadow-md shadow-fuchsia-800 w-full"
                        onClick={() =>
                            (window.location.href = `/clientadmin/${client?.user_id}`)
                        }
                    >
                        View Info
                    </button>
                    <button
                        className="btn  btn-secondary shadow-lg shadow-fuchsia-800 w-full"
                        onClick={() =>
                            (
                                document.getElementById(
                                    "my_modal_5"
                                ) as HTMLDialogElement
                            ).showModal()
                        }
                    >
                        Update Client
                    </button>
                    <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                    >
                        <div className="modal-box">
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() =>
                                    (
                                        document.getElementById(
                                            "my_modal_5"
                                        ) as HTMLDialogElement
                                    ).close()
                                }
                            >
                                ✕
                            </button>
                            <h3 className="font-bold text-lg">
                                Client Update:
                            </h3>
                            <p className="">
                                Enter picture and description to send to{" "}
                                {client?.first_name} {client?.last_name} below.
                            </p>
                            <div className="modal-action">
                                <form
                                    method="dialog"
                                    onSubmit={handleFileUpload}
                                >
                                    <div className="w-full">
                                        <input
                                            type="file"
                                            name="file"
                                            id="file"
                                            className="file-input file-input-bordered w-full"
                                            onChange={onFileChange}
                                        />
                                        <textarea
                                            className="textarea textarea-bordered w-full my-2"
                                            name="description"
                                            id="description"
                                            placeholder="Enter Update Description"
                                            onChange={onDescChange}
                                        ></textarea>
                                    </div>
                                    <button
                                        className="btn btn-secondary shadow-lg shadow-fuchsia-800 w-full"
                                        onClick={() =>
                                            (
                                                document.getElementById(
                                                    "my_modal_5"
                                                ) as HTMLDialogElement
                                            ).close()
                                        }
                                    >
                                        Send Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
}
