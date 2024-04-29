import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import { Cloudinary } from "@cloudinary/url-gen";

// import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
// import { dog } from "@cloudinary/url-gen/qualifiers/focusOn";
import { CategoryType, DogType, UserType } from "../types";
import { editDog, getDogById, uploadImageToCloudinary } from "../lib/apiWrapper";
// import { set } from "@cloudinary/url-gen/actions/variable";


// Cloudinary preset - np97uesu

type DogFormProps = {
    currentUser: UserType;
    flashMessage: (
        newMessage: string | undefined,
        newCategory: CategoryType | undefined
    ) => void;
};


export default function DogForm({ currentUser, flashMessage }: DogFormProps) {
    const { dogId } = useParams();
    const navigate = useNavigate();

    const [isSpayedOrNeutered, setIsSpayedOrNeutered] = useState(false);
    const handleGenderCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsSpayedOrNeutered(event.target.checked);
    };

    const [isCrated, setIsCrated] = useState(false);
    const handleCrateCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsCrated(event.target.checked);
    };

    const [gender, setGender] = useState("");
    const handleGenderChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setGender(event.target.value);
    };

    const [dailyUpdates, setDailyUpdates] = useState(false);
    const handleUpdatesCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setDailyUpdates(event.target.checked);
    };

    const [dogFormData, setDogFormData] = useState<Partial<DogType>>({});
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDogFormData({
            ...dogFormData,
            [e.target.id]: e.target.value,
        });
    };

    const [dogFormTextAreaData, setDogFormTextAreaData] = useState<
        Partial<DogType>
    >({});

    const handleTextAreaChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDogFormTextAreaData({
            ...dogFormTextAreaData,
            [e.target.id]: e.target.value,
        });
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const dogSubmit: DogType = {
            name: dogFormData.name,
            breed: dogFormData.breed,
            birthday: dogFormData.birthday,
            sex: gender,
            altered: isSpayedOrNeutered,
            health_conditions: dogFormTextAreaData.health_conditions,
            medications: dogFormTextAreaData.medications,
            allergies: dogFormTextAreaData.allergies,
            bn_favorite_activities: dogFormTextAreaData.bn_favorite_activities,
            bn_issues: dogFormTextAreaData.bn_issues,
            feeding_schedule: dogFormTextAreaData.feeding_schedule,
            potty_schedule: dogFormTextAreaData.potty_schedule,
            crated: isCrated,
            daily_updates: dailyUpdates,
        };

        console.log(dogSubmit);

        let response = await editDog(
            dogSubmit as DogType,
            parseInt(dogId ?? ""),
            currentUser!.token
        );
        if (response.error) {
            console.log(response.error);
            flashMessage(response.error, "danger");
        } else {
            let newDog = response.data!;
            flashMessage(`Welcome, ${newDog.name}!`, "success");
            console.log(newDog);
            navigate(`/dog/${newDog.dog_id}`);
        }
    };



    useEffect(() => {
        if (!currentUser?.token) {
            console.log("Waiting for user and token...");
            return;
        }
        async function getDogInfo() {
            let response = await getDogById(
                parseInt(dogId ?? ""),
                currentUser!.token
            );
            if (response.data) {
                const dog = response.data;
                console.log(dog);

                if (!currentUser?.token) {
                    console.log("No user logged in");
                } else if (dog.user_id !== currentUser!.user_id) {
                    flashMessage(
                        "You are not authorized to edit this profile",
                        "danger"
                    );
                    navigate("/");
                } else {
                    setDogFormData({
                        name: dog.name,
                        breed: dog.breed,
                        birthday: dog.birthday,
                    });
                    setDogFormTextAreaData({
                        health_conditions: dog.health_conditions,
                        medications: dog.medications,
                        allergies: dog.allergies,
                        bn_favorite_activities: dog.bn_favorite_activities,
                        bn_issues: dog.bn_issues,
                        feeding_schedule: dog.feeding_schedule,
                        potty_schedule: dog.potty_schedule,
                    });
                    setIsSpayedOrNeutered(dog.altered!);
                    setIsCrated(dog.crated!);
                    setDailyUpdates(dog.daily_updates!);
                    setGender(dog.sex!);
                }
            } else if (response.error) {
                console.log(response.error, currentUser!.token);
                flashMessage(response.error, "danger");
            } else {
                flashMessage("An error occurred", "warning");
            }
        }
        getDogInfo();
    }, [currentUser?.token]);


    const [file, setFile] = useState<File>();
    // const [imageURL, setImageURL] = useState<Partial<DogType>>({});

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the state
        setFile(event.target.files![0]);
    };

    // const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     let response = await uploadImageToCloudinary(file!);
    //     if (response.error) {
    //         console.log(response.error);
    //         flashMessage(response.error, "danger");
    //     } else {
    //         console.log(response.data);
    //         flashMessage(`Image uploaded successfully!`, "success");
    //     }
    //     let imageResponse = response.data;
    //     console.log("imagetest", imageResponse);


    //     setImageURL({
    //         profile_pic_url: imageResponse.secure_url,
    //     });

    //     console.log(imageURL);

    //     let response3 = await editDog(
    //         imageURL,
    //         parseInt(dogId ?? ""),
    //         currentUser!.token
    //     );
    //     if (response3.error) {
    //         console.log(response3.error);
    //         flashMessage(response3.error, "danger");
    //     } else {
    //         let newDog = response3.data!;
    //         flashMessage(`Picture Updated!`, "success");
    //         console.log(newDog);
    //     }
    // }

    const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let imageURL = {}

        try {
            let response = await uploadImageToCloudinary(file!);
            if (response.error) {
                console.log(response.error);
                flashMessage(response.error, "danger");
            } else {
                console.log(response.data);
                flashMessage('Image uploaded successfully!', "success");
                let imageResponse = response.data;
                console.log("imagetest", imageResponse);
    
                imageURL = ({
                    "profile_pic_url": imageResponse.secure_url,
                });
                
                console.log("after setImageUrl", imageURL);
            }

        } catch (error) {
            console.log(error);
            flashMessage("An error occurred", "danger");
        } finally {
            
            let response3 = await editDog(
                imageURL,
                parseInt(dogId!),
                currentUser!.token
            );
            if (response3.error) {
                console.log(response3.error);
                flashMessage(response3.error, "danger");
            } else {
                let newDog = response3.data!;
                flashMessage(`Picture Updated!`, "success");
                console.log("newDog", newDog);
                console.log("after editDog", imageURL);
            }
        }
        console.log("after try block", imageURL);
    }
        
    return (
        <div className="flex justify-center p-4">
            <div className="hero w-96 lg:w-3/4 bg-base-200 rounded-lg">
                <div className="hero-content text-center ">
                    <div className="max-w-md">
                        <h1 className="text-5xl m-4 font-bold">
                            Make Updates for {dogFormData.name}
                        </h1>

                        <form onSubmit={handleFileUpload}>
                            <div className="mx-auto w-80 sm:max-w-md md:max-w-lg flex flex-col">
                                <input
                                    type="file"
                                    name="file"
                                    id="file"
                                    className="file-input file-input-bordered"
                                    // className="input input-bordered"
                                    onChange={onFileChange}
                                    
                                />
                                <button className="btn m-4 btn-secondary shadow-lg shadow-fuchsia-800 mx-auto w-80 sm:max-w-md md:max-w-lg flex flex-col gap-5">
                                    Add Picture
                                </button>
                            </div>
                        </form>

                        <form onSubmit={handleFormSubmit}>
                            <div className="mx-auto w-80 sm:max-w-md md:max-w-lg flex flex-col gap-5">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    value={dogFormData.name}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                />
                                <input
                                    type="text"
                                    name="breed"
                                    id="breed"
                                    placeholder="Breed"
                                    value={dogFormData.breed}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                />
                                <input
                                    type="text"
                                    name="birthday"
                                    id="birthday"
                                    placeholder="Birth Date (approximately)"
                                    value={dogFormData.birthday}
                                    onChange={handleInputChange}
                                    className="input input-bordered"
                                />
                                <select
                                    className="select select-bordered w-full max-w-xs"
                                    value={gender}
                                    onChange={handleGenderChange}
                                    id="sex"
                                    name="sex"
                                >
                                    <option disabled value="">
                                        Dog's Gender
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">
                                            Spayed/Neutered?
                                        </span>
                                        <input
                                            type="checkbox"
                                            id="altered"
                                            checked={isSpayedOrNeutered}
                                            onChange={
                                                handleGenderCheckboxChange
                                            }
                                            className="checkbox"
                                        />
                                    </label>
                                </div>
                                <label className="form-control">
                                    <textarea
                                        className="textarea textarea-bordered h-24"
                                        placeholder="Known Health Conditions"
                                        name="health_conditions"
                                        id="health_conditions"
                                        value={dogFormTextAreaData.health_conditions}
                                        onChange={handleTextAreaChange}
                                    ></textarea>
                                </label>
                                <label className="form-control">
                                    <textarea
                                        className="textarea textarea-bordered h-24"
                                        placeholder="Medications"
                                        name="medications"
                                        id="medications"
                                        value={dogFormTextAreaData.medications}
                                        onChange={handleTextAreaChange}
                                    ></textarea>
                                </label>
                                <label className="form-control">
                                    <textarea
                                        className="textarea textarea-bordered h-24"
                                        placeholder="Allergies"
                                        name="allergies"
                                        id="allergies"
                                        value={dogFormTextAreaData.allergies}
                                        onChange={handleTextAreaChange}
                                    ></textarea>
                                </label>
                                <label className="form-control">
                                    <textarea
                                        className="textarea textarea-bordered h-24"
                                        placeholder="What are your dog's favorite activities?"
                                        name="bn_favorite_activities"
                                        id="bn_favorite_activities"
                                        value={
                                            dogFormTextAreaData.bn_favorite_activities
                                        }
                                        onChange={handleTextAreaChange}
                                    ></textarea>
                                </label>
                                <label className="form-control">
                                    <textarea
                                        className="textarea textarea-bordered h-24"
                                        placeholder="Please list any behavioral issues or concerns that will help us provide the best care for your dog."
                                        name="bn_issues"
                                        id="bn_issues"
                                        value={dogFormTextAreaData.bn_issues}
                                        onChange={handleTextAreaChange}
                                    ></textarea>
                                </label>
                                <label className="form-control">
                                    <textarea
                                        className="textarea textarea-bordered h-24"
                                        placeholder="What is your dog's usual feeding schedule?"
                                        name="feeding_schedule"
                                        id="feeding_schedule"
                                        value={dogFormTextAreaData.feeding_schedule}
                                        onChange={handleTextAreaChange}
                                    ></textarea>
                                </label>
                                <label className="form-control">
                                    <textarea
                                        className="textarea textarea-bordered h-24"
                                        placeholder="What is your dog's usual potty schedule?"
                                        name="potty_schedule"
                                        id="potty_schedule"
                                        value={dogFormTextAreaData.potty_schedule}
                                        onChange={handleTextAreaChange}
                                    ></textarea>
                                </label>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">
                                            Is your dog crate trained?
                                        </span>
                                        <input
                                            type="checkbox"
                                            onChange={handleCrateCheckboxChange}
                                            className="checkbox"
                                            checked={isCrated}
                                        />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">
                                            Would you like daily updates on your
                                            dog?
                                        </span>
                                        <input
                                            type="checkbox"
                                            onChange={
                                                handleUpdatesCheckboxChange
                                            }
                                            className="checkbox"
                                            checked={dailyUpdates}
                                        />
                                    </label>
                                </div>

                                <button className="btn m-4 btn-secondary shadow-lg shadow-fuchsia-800">
                                    Update {dogFormData.name}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
